<template>
  <div
    :class="$style.wizard__exit"
    @click.prevent="$router.push({ path: '/organizations' })"
    @keyup.enter.prevent="$router.push({ path: '/organizations' })"
  >
    <ElButton type="danger" size="small" icon="el-icon-close">Cancel</ElButton>
  </div>
</template>

<script>
import { Button } from "element-ui";

export default {
  components: {
    [Button.name]: Button,
  },
};
</script>

<style lang="scss" module>
.wizard__exit {
  position: absolute;
  right: 0;
  top: 4px;

  :global(.el-button--danger) {
    vertical-align: top;
    border-color: #bdbdbd;
    background: #bdbdbd;
    &:hover {
      background: #ff7878;
      border-color: #ff7878;
    }
  }
}

@media (max-width: 56.25em) {
  .wizard__exit {
    button {
      padding: 0.25rem;
      span {
        display: none;
      }
    }
  }
}
</style>
