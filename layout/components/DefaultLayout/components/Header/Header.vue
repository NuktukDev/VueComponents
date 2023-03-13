<template>
  <header
    :class="[$style.header, isSearchBarOpen && $style.tint__background]"
    :data-expanded="expanded"
  >
    <button
      :class="$style.header__hamburger"
      @click="$emit('mobileMenuClick')"
      v-if="!noSidePanel"
    >
      Menu
    </button>
    <div :class="$style.header__logo">
      <slot name="logo"></slot>
    </div>
    <div :class="$style.header__content">
      <div :class="$style['header__breadcrumbs-container']">
        <HeaderCollapseButton
          @click="$emit('click')"
          :data-expanded="expanded"
        />
        <HeaderBreadcrumbs />
      </div>
      <HeaderUtility
        :isSearchBarOpen="isSearchBarOpen"
        @searchBarFocus="$emit('searchBarFocus')"
        @searchBarBlur="$emit('searchBarBlur')"
      />
    </div>
  </header>
</template>

<script>
import HeaderCollapseButton from "./components/HeaderCollapseButton.vue";
import HeaderBreadcrumbs from "./components/HeaderBreadcrumbs.vue";
import HeaderUtility from "./components/HeaderUtility.vue";

export default {
  components: { HeaderCollapseButton, HeaderBreadcrumbs, HeaderUtility },
  props: ["expanded", "isSearchBarOpen", "noSidePanel"],
};
</script>

<style lang="scss" module>
.header {
  // for some reason anchor is adding 2px of height to logo
  height: calc($logo-height + 1rem + 2px);
  &[data-expanded] {
    padding: 0.5rem 2rem;
  }
  display: flex;
  align-items: center;
  width: 100%;
  background-color: $header-background; // @/styles/_variables.scss
  padding: 0.5rem 4rem;

  .header__hamburger {
    display: none;
    width: 3rem;
    height: 3rem;
    flex-shrink: 0;
    padding: 0;
    margin-right: 1rem;
    background-color: rgba(0, 0, 0, 0);
    background-image: url("@/assets/images/hamburger-icon.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    text-indent: -9999px;
    border: none;
  }

  .header__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    width: 100%;
    margin-left: 5.5rem;

    .header__breadcrumbs-container {
      display: flex;
      align-items: center;
    }
  }
}

@media (max-width: 65.625em) {
  .header {
    .header__content {
      .header__breadcrumbs-container {
        display: none;
      }
    }
  }
}
@media (max-width: 48.125em) {
  .header {
    .header__hamburger {
      display: block;
    }
    &.tint__background {
      background: #000;
      opacity: 0.7;
      z-index: 2;
    }
    .header__logo {
      position: absolute;
      left: calc(50% - ($logo-width--small / 2));
      z-index: 11;
    }
    .header__content {
      margin-left: 0;
    }
  }
}
</style>
