<template>
  <div
    :class="[
      $style.logo__container,
      size === 'small' && $style['logo__container--small'],
    ]"
  >
    <router-link :to="{ name: 'Home' }" :class="$style.logo__link">
      <img :src="getLogoSource" :class="$style.logo" alt="logo" />
    </router-link>
  </div>
</template>

<script>
import logoWhite from "@/assets/images/logo-white.png";
import logoMini from "@/assets/images/logo-white-mini.png";

export default {
  props: ["size"],
  computed: {
    getLogoSource() {
      return this.size === "small" ? logoMini : logoWhite;
    },
  },
};
</script>

<style lang="scss" module>
.logo__container {
  &.logo__container--small {
    .logo__link {
      width: $logo-width--small;
    }
    .logo {
      width: $logo-width--small;
    }
  }

  .logo__link {
    display: block;
    width: $logo-width;
  }
  .logo {
    width: $logo-width;
    height: $logo-height;
    align-self: center;
  }
}
</style>
