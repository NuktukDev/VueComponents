<template>
  <RouterLink
    :to="node.path"
    :class="[
      $style['side-panel__link'],
      active && 'active',
      iconOnly && 'side-panel__link--icon-only',
    ]"
  >
    <span :class="['material-symbols-rounded', $style.link__icon]">
      {{ node.icon }}
    </span>
    <span :class="$style.link__text" v-show="!iconOnly">
      {{ node.text }}
    </span>
  </RouterLink>
</template>

<script>
export default {
  props: ["node", "active", "iconOnly"],
};
</script>

<style lang="scss" module>
.side-panel__link {
  display: block;
  padding: 0.5rem 0.25rem;
  font-size: 1.5rem;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
  &:global(.active) {
    .link__icon,
    .link__text {
      color: map-get($colors, primary);
    }
    .link__text {
      font-weight: 800;
    }
  }
  &:global(.side-panel__link--icon-only) {
    text-align: center;
    .link__icon {
      font-size: 1.5em;
      margin-right: 0;
    }
  }

  span {
    display: inline-block;
    color: map-get($colors, secondary);
  }
  .link__icon {
    margin-right: 1rem;
    font-size: 1em;
    font-weight: 300;
    vertical-align: bottom;
  }
  .link__text {
    font-family: "Poppins", sans-serif;
    font-size: 0.5em;
    font-weight: 500;
    text-transform: uppercase;
    color: grey;
    vertical-align: middle;
  }
}
</style>
