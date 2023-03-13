<template>
  <div :class="$style['wizard-progress']">
    <BaseButton
      v-for="{ step, label, icon } = loopStep in steps"
      :key="step"
      :class="$style['wizard-progress__step']"
      :data-active="step === currentStep"
      @click="handleStepClick(step)"
      :textOnly="true"
      :disabled="!allowedSteps.includes(step - 1)"
    >
      <div :class="$style['step__icon-spacer-container']">
        <span :class="['material-symbols-rounded', $style.step__icon]">{{
          icon
        }}</span>
        <div :class="$style['step__spacer']" v-if="step < steps.length"></div>
      </div>
      <span :class="$style.step__label">
        {{ label }}
      </span>
    </BaseButton>
  </div>
</template>

<script>
export default {
  props: ["currentStep", "steps", "allowedSteps"],
  methods: {
    handleStepClick(step) {
      this.$emit("moveToStep", step);
    },
  },
};
</script>

<style lang="scss" module>
/* component blocks */
.wizard-progress {
  position: fixed;
  margin-top: -2rem;
  display: flex;
  min-width: 300px;
  width: 30%;
  max-width: 432px;
  height: 100vh;
  padding: 4.25rem 2.4rem 4.25rem 0;
  background-color: #fdfdfd;
  font-size: 1rem;
  flex-direction: column;
  align-items: end;
  border-right: 1px solid #d7d7d7;

  /* component block elements */
  .wizard-progress__step {
    &[data-active="true"] {
      .step__icon-spacer-container {
        .step__icon {
          &:global(.material-symbols-rounded) {
            background-color: #6589ff;
          }
        }
      }
      .step__label {
        color: $font-base-color;
        font-weight: 500;
      }
    }
    &:disabled {
      cursor: not-allowed;
    }
    display: flex;
    min-width: 225px;
    margin-top: 0.5rem 0 0 0;
    gap: 2rem;

    &:first-of-type {
      margin-top: 0;
    }
    .step__icon-spacer-container {
      display: flex;
      flex-direction: column;

      .step__icon {
        margin-bottom: 0.5rem;

        &:global(.material-symbols-rounded) {
          padding: 1rem;
          background-color: map-get($colors, primary--lighter);
          font-size: 1.65rem;
          color: #fff;
          border-radius: 50%;
        }
      }
      .step__spacer {
        width: 1px;
        height: 2rem;
        background-color: #b0b0b0;
        align-self: center;
      }
    }

    .step__label {
      font-family: "Poppins";
      color: $font-shallow-color;
      font-weight: 400;
      font-size: 1rem;
      margin-top: 1.3rem;
    }
  }
}

@media (max-width: 87.5em) {
  .wizard-progress {
    max-width: 304px;
  }
}
@media (max-width: 56.25em) {
  .wizard-progress {
    position: unset;
    width: 100%;
    max-width: unset;
    min-width: unset;
    height: unset;
    padding: 0;
    margin-top: 1rem;
    background: unset;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    border: none;

    .wizard-progress__step {
      min-width: unset;
      flex-direction: column;
      gap: 0;

      &[data-active],
      &:last-child {
        .step__label {
          display: block;
          margin-right: 1rem;
        }
      }

      .step__icon-spacer-container {
        flex-direction: row;
        align-items: center;

        .step__icon {
          &:global(.material-symbols-rounded) {
            padding: 0.35rem;
            margin: 0;
          }
        }
        .step__spacer {
          width: 2rem;
          height: 1px;
          margin: 0 0.25rem;
        }
      }
      .step__label {
        display: none;
        font-size: 0.75rem;
      }
    }
  }
}
</style>
