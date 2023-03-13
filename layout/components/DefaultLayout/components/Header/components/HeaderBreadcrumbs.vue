<template>
  <span
    :class="$style.breadcrumbs__text"
    v-html="$breadcrumbs.value"
    v-show="$breadcrumbs.value !== ''"
  ></span>
</template>

<script>
import Vue from "vue";
Vue.prototype.$breadcrumbs = Vue.observable({ value: "" });

export default {
  computed: {
    getRouteBreadcrumbs() {
      const breadcrumbIcon =
        '<span class="material-symbols-rounded">chevron_right</span>';
      const matchedRoutes = this.$route.matched
        .filter((r) => r.meta.title)
        .map((r) => r.meta.title);
      const finalBreadcrumb = matchedRoutes.join(breadcrumbIcon);

      return finalBreadcrumb;
    },
  },
  watch: {
    $route: function (to, from) {
      console.log("route changed");
      this.$breadcrumbs.value = this.getRouteBreadcrumbs || "";
    },
  },
  created() {
    this.$breadcrumbs.value = this.getRouteBreadcrumbs || "";
  },
};
</script>

<style lang="scss" module>
.breadcrumbs__text {
  padding-left: 0.75rem;
  :global(.material-symbols-rounded) {
    vertical-align: text-bottom;
  }
}
</style>
