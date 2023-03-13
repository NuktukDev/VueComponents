<template>
  <ElOption v-bind="$attrs" v-on="$listeners">
    <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot" />
    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </ElOption>
</template>
<script>
  import { Option } from 'element-ui';

  export default {
    name: 'Option',
    components: { [Option.name]: Option },
    inheritAttrs: false,
  };
</script>
