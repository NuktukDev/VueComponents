<template>
  <div :class="$style['collapse-button__container']">
    <BaseButton
      type="primary"
      :class="$style['collapse-button']"
      icon="el-icon-arrow-left"
      circle
      @click="$emit('click')"
    />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" module>
.collapse-button__container {
  .collapse-button {
    background-color: map-get($colors, primary--light);
    border-color: map-get($colors, primary--light);
    font-size: 1.25rem;
    color: white;
  }
  &[data-expanded] {
    .collapse-button {
      :global(.el-icon-arrow-left) {
        -webkit-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        transform: rotate(180deg);
      }
    }
  }
}
</style>
