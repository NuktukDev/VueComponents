<template>
  <div :class="$style['nav-buttons']">
    <div :class="navButtonsBackgroundClass">
      <ElButton
        @click="$emit('previous')"
        :class="[$style.previousButton, step <= 1 && $style.hidden]"
        >Previous</ElButton
      >
      <ElButton @click="$emit('next')" type="primary" :disabled="!enableNext">{{
        forwardButtonText
      }}</ElButton>
    </div>
  </div>
</template>

<script>
import { Button } from "element-ui";

export default {
  components: {
    [Button.name]: Button,
  },
  props: ["step", "maxSteps", "enableNext", "isTransparent"],
  computed: {
    navButtonsBackgroundClass() {
      return [
        this.$style["nav-buttons-background"],
        this.isTransparent !== undefined && this.$style.transparent,
      ];
    },
    forwardButtonText() {
      return this.step === this.maxSteps ? "Finish" : "Next";
    },
  },
};
</script>

<style lang="scss" module>
.nav-buttons {
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  padding: 0;

  .nav-buttons-background {
    display: flex;
    justify-content: space-between;
    background: white;
    width: 100%;
    padding: 1.75rem 0;

    &.transparent {
      background-color: rgba(255, 255, 255, 0.4);
    }
    :global(.el-button--primary) {
      &:not(:global(.is-disabled)) {
        background-color: map-get($colors, secondary);
      }
    }
    .previousButton {
      &:not(:global(.is-disabled)) {
        background-color: map-get($colors, primary--light);
      }

      color: #fff;
    }
    .is-disabled::after {
      display: block;
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(233, 233, 233, 0.5);
    }
    .align-right {
      margin-left: auto;
    }
    .hidden {
      visibility: hidden;
    }
  }
}
</style>
