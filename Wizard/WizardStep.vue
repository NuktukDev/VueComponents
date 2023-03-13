<template>
  <div v-show="active" v-if="active">
    <slot />
  </div>
</template>
<script>
  export default {
    name: 'WizardStep',
    props: {
      icon: String,
      label: String,
      enableNext: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        active: false,
      };
    },
  };
</script>
