<template>
  <div class="select-container">
    <slot name="label">
      <label :for="id" :class="labelClasses">{{ label }}</label>
    </slot>

    <ElSelect
      v-bind="$attrs"
      v-on="$listeners"
      :id="id"
      :class="selectClasses"
      :value="value ? value : ''"
    >
      <slot name="options">
        <ElOption v-for="option in options" :key="option" :value="option" />
      </slot>
      <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot" />
      <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </ElSelect>
  </div>
</template>
<script>
import { Select, Option } from "element-ui";

export default {
  name: "Select",
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
  },
  inheritAttrs: false,
  props: {
    id: String,
    label: String,
    options: Array,
    value: [String, Array, Number, Object],
    labelClasses: [String, Array, Object],
    selectClasses: [String, Array, Object],
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .input-error {
    input {
      border: 1px solid #ea5757;
      background-color: #ffe9e9;
    }
    input::placeholder {
      color: #000;
    }
  }
  .el-select .el-input:hover input {
    color: inherit;
  }
  .el-select .el-input:hover input::placeholder {
    color: inherit;
  }
}
</style>
