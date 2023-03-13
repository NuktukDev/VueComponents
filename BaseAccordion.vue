<template>
  <div :class="$style['base-accordion']" v-bind="$attrs">
    <div :class="getHeaderClasses" @click="handleAccordionClick(stateIsActive)">
      <div>
        <h4 :class="$style.title">{{ title }}</h4>
        <i :class="['el-icon-arrow-right', $style['title-icon']]"></i>
      </div>
      <slot name="button"></slot>
    </div>
    <collapse-transition>
      <div :class="getBodyClasses" v-show="stateIsActive">
        <slot />
      </div>
    </collapse-transition>
  </div>
</template>

<script>
import { CollapseTransition } from "@ivanv/vue-collapse-transition";
export default {
  name: "BaseAccordion",
  components: { CollapseTransition },

  inheritAttrs: false,
  props: {
    title: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      stateIsActive: this.isActive,
      slotHeight: 0,
    };
  },
  computed: {
    getHeaderClasses() {
      const header = this.$style["base-accordion__header"];
      const active = this.$style["base-accordion__header--active"];
      return {
        [header]: true,
        [active]: this.stateIsActive,
      };
    },
    getBodyClasses() {
      const bodyClass = this.$style["base-accordion__body"];
      return [bodyClass];
    },
    getBodyStyles() {
      return {
        // maxHeight for slide down animation
        maxHeight: `${this.stateIsActive ? this.slotHeight : 0}px`,
      };
    },
  },
  methods: {
    handleAccordionClick(isActive) {
      if (isActive) {
        this.closeAccordion();
      } else {
        this.openAccordion();
      }
    },
    openAccordion() {
      this.stateIsActive = true;
    },
    closeAccordion() {
      this.stateIsActive = false;
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.slotHeight = this.$slots.default[0].elm.clientHeight;
    });
    console.log("mounted");
  },
};
</script>

<style lang="scss" module>
.base-accordion {
  margin: 1rem 0;
  &__header {
    &--active,
    &:hover {
      color: #2285bf;
    }
    &--active {
      .title-icon {
        transform: rotate(90deg);
      }
    }
    display: flex;
    padding: 0 0.5rem;
    justify-content: space-between;
    align-items: center;
    color: #8a8a8a;
    cursor: pointer;
    .title {
      display: inline;
      margin: 0;
    }
    .title-icon {
      margin-left: 0.25rem;
      font-size: 0.875rem;
      font-weight: 700;
      transition: all 300ms ease 0s;
    }
  }
  &__body {
    padding: 0 0.25rem;
    margin: 0.75rem 0;
    overflow: hidden;
  }
}
</style>
