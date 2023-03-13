<template>
  <BaseButton :textOnly="true" v-on="$listeners">
    <span class="material-symbols-outlined">{{ node.icon }}</span> {{ node.text }}
  </BaseButton>
</template>

<script>
  export default {
    props: ['node'],
  };
</script>

<style lang="scss" module></style>
