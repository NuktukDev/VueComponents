<template>
  <div :class="$style.utility__filter">
    <div :class="$style.filter__modal" :style="{ display: showFilterModal ? 'block' : 'none' }">
      <component
        type="text"
        v-for="filter in filters"
        :name="filter.column"
        :placeholder="filter.label"
        :key="filter.column"
        :is="filter.element ? filter.element : 'input'"
      />
    </div>
    <button
      :class="[$style['utility__button'], $style['utility__button--secondary']]"
      @click="$emit('click')"
    >
      <i class="el-icon-set-up" aria-hidden="true"></i>
      <span>Filters</span>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'TableFilter',
    props: ['filters']
  }
</script>

<style lang="scss" module>
.utility__filter {
  position: relative;
  flex-shrink: 0;
  margin-left: 0.5rem;

  .filter__modal {
    position: absolute;
    top: -50px;
    left: -376px;
    width: 350px;
    background: #fff;
    border: 1px solid #1b6a99;
    border-radius: 4px;
    padding: 2rem;
    z-index: 99;
    box-shadow: 0px 1px 4px #3e85c0;

    input[type="text"] {
      color: #606060;
      padding: 0.5rem 0.625rem;
      font-family: "Source Sans Pro";
      font-size: 0.875rem;
      font-weight: 500;
      outline: none;
      width: 100%;
      line-height: 0;
      border: 1px solid #d1d1d1;
      border-radius: 4px;
      margin: 0.5rem 0;
    }
    input[type="text"]:first-child {
      margin-top: 0;
    }
    input[type="text"]:last-child {
      margin-bottom: 0;
    }
    input[type="text"]::placeholder {
      color: #bbbbbb;
    }
  }
}
</style>