<template>
  <div :class="$style['wizard']">
    <WizardProgress
      :currentStep="step"
      :steps="stepData"
      :allowedSteps="getClickableSteps"
      @moveToStep="handleMoveToStep"
    />

    <div :class="$style['wizard__content']">
      <div :class="$style['content__relativeContainer']">
        <WizardExit v-if="!finished" />
        <slot v-if="!finished" />
        <slot name="finished" v-else>Finished! Add your finish screen.</slot>
      </div>
      <WizardButtons
        :step="step"
        :maxSteps="getMaxSteps"
        :enableNext="getCurrentNextEnabled"
        :isTransparent="true"
        v-if="!finished"
        @previous="handlePreviousStep"
        @next="handleNextStep"
      />
    </div>
  </div>
</template>
<script>
import partitionArray from "@/utils/partition-array";

import WizardProgress from "./components/WizardProgress.vue";
import WizardExit from "./components/WizardExit.vue";
import WizardButtons from "./components/WizardButtons.vue";

// components plugged into the default slot must be of this name
const ALLOWED_SLOT_NAME = "WizardStep";
const COMPONENT_NAME = "Wizard";

export default {
  components: {
    WizardProgress,
    WizardExit,
    WizardButtons,
  },
  data() {
    return {
      step: 1,
      tabs: [],
      stepData: [],
      stepsVisited: [],
      finished: false,
    };
  },
  computed: {
    getMaxSteps() {
      return this.$slots.default.length;
    },
    getStepIndex() {
      return this.step - 1;
    },
    getCurrentNextEnabled() {
      return this.tabs[this.getStepIndex]?.enableNext ?? false;
    },
    getClickableSteps() {
      const _this = this;
      const clickableSteps = this.tabs.reduce(function (prev, curr, currIndex) {
        if (currIndex === 0) {
          prev.push(curr);
          return prev;
        }
        if (
          prev[currIndex - 1]?._props?.enableNext &&
          _this.stepsVisited.includes(currIndex) &&
          currIndex === prev.length
        ) {
          prev.push(curr);
        }
        return prev;
      }, []);

      return [...clickableSteps.keys()];
    },
    currentTab() {
      return this.tabs[this.getStepIndex];
    },
    currentComponent() {
      return this.tabs[this.getStepIndex];
    },
  },
  methods: {
    finishWizard() {
      this.finished = true;
      this.$emit("finished");
    },
    handlePreviousStep() {
      if (this.step > 1) {
        this.handleMoveToStep(this.step - 1);
      }
    },
    handleNextStep() {
      this.handleMoveToStep(this.step + 1);
    },
    handleMoveToStep(step) {
      if (this.finished) {
        return;
      }
      if (step > this.getMaxSteps) {
        this.finishWizard();
        return;
      }
      if (!this.checkStepValid(step)) {
        return;
      }

      this.currentTab.active = false;
      this.step = step;
      this.stepsVisited.push(step);
      this.currentTab.active = true;
      window.scrollTo(0, 0);
    },
    checkStepValid(step) {
      if (step <= 0) {
        return false;
      }
      // Checks all the previous steps before "step" argument.
      // Checks if they are invalid or have not been visited before
      const invalidStepsBefore = this.tabs.filter(
        (tab, index) =>
          index + 1 < step &&
          (tab?._props?.enableNext === false ||
            !this.stepsVisited.includes(index + 1))
      );

      if (invalidStepsBefore.length) {
        return false;
      }
      return true;
    },
  },

  created() {
    // make sure user is using WizardStep.vue
    const [_, failedItems] = partitionArray(
      this.$slots.default,
      (vnode) => vnode.componentOptions?.tag === ALLOWED_SLOT_NAME
    );
    if (failedItems.length) {
      throw Error(
        `Cannot use ${failedItems[0].tag} tag inside ${COMPONENT_NAME}`
      );
    }
  },
  mounted() {
    this.tabs = [
      ...this.$slots.default.map((vnode) => vnode.componentInstance),
    ];
    this.tabs[0].active = true;
    this.stepsVisited.push(1);
    this.stepData = [
      ...this.tabs.map((vnode, index) => ({
        step: index + 1,
        icon: vnode?._props?.icon,
        label: vnode?._props?.label,
      })),
    ];
  },
};
</script>

<style lang="scss" module>
/* blocks */
.wizard {
  position: relative;
}
/* block elements */
.wizard__content {
  padding: 1px 2rem;
  margin-left: 442px;
}
.content__relativeContainer {
  position: relative;
  padding-bottom: 4rem;
}

@media (max-width: 87.5em) {
  .wizard__content {
    margin-left: 304px;
  }
}
@media (max-width: 68.75em) {
  .wizard__content {
    padding: 1px 2.5rem 0 2.5rem;
    margin-left: 300px;
  }
}

@media (max-width: 56.25em) {
  .wizard__content {
    width: 100%;
    padding: 0.25rem;
    margin-left: 0;
  }
}
</style>
