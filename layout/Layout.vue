<template>
  <component :is="layoutComponentToRender" v-bind="layoutPropsToRender">
    <!-- forwarding slots -->
    <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </component>
</template>

<script>
import layoutComponents from "./constants/layoutComponentConstants";

export default {
  computed: {
    layoutComponentToRender() {
      const layout = this.$route?.meta?.layout?.component || "DEFAULT";
      return layoutComponents[layout];
    },
    layoutPropsToRender() {
      const props = this.$route?.meta?.layout?.props || {};
      return props;
    },
  },
};
</script>

<style lang="scss"></style>
