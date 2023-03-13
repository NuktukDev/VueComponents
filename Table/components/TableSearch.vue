<template>
  <div :class="$style.utility__search">
    <i class="el-icon-search" aria-hidden="true"></i>
    <input
      type="text"
      :placeholder="placeholder"
      v-model="text"
      @input="searchHandler"
    />
  </div>
</template>

<script>
import debounce from "debounce";
export default {
  name: "TableSearch",
  props: ["placeholder"],
  data() {
    return {
      text: "",
    };
  },
  methods: {
    searchHandler: debounce(function () {
      this.$emit("search", this.text);
    }, 300),
  },
};
</script>

<style lang="scss" module>
.utility__search {
  display: flex;
  color: #bbbbbb;
  border: 1px solid #d1d1d1;
  padding: 0.25rem 0.625rem;
  background: #fff;
  font-size: 1rem;
  line-height: 0;
  align-items: center;
  
  input[type="text"] {
    color: #606060;

    font-family: "Source Sans Pro";
    font-size: 0.875rem;
    font-weight: 500;
    outline: none;
    width: 100%;
    line-height: 0;

    border-radius: 4px;
    border: none;
    padding: 0.25rem 0.625rem;
    margin: 0;
  }
  input[type="text"]::placeholder {
    color: #bbbbbb;
  }
}
</style>
