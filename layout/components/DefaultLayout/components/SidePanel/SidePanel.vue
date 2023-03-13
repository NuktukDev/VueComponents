<template>
  <PerfectScrollbar
    tag="nav"
    :class="$style['side-panel']"
    :data-collapsed="collapsed"
    :data-mobile-open="mobileOpen"
  >
    <slot></slot>
    <ul :class="$style['side-panel__nav']">
      <li v-for="(node, i) in sidePanelNodes" :key="`${node.text}${i}`">
        <SidePanelRecursiveNode :node="node" :nodeIconOnly="collapsed" />
      </li>
    </ul>
  </PerfectScrollbar>
</template>
<script>
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import SidePanelRecursiveNode from "./components/SidePanelRecursiveNode.vue";

export default {
  components: { SidePanelRecursiveNode, PerfectScrollbar },
  props: {
    sidePanelNodes: {
      type: Array,
      default: () => [],
      description:
        "Side Panel links. Can be also provided as children components (sidePanelItem)",
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
    mobileOpen: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style>
.side-panel-slide-enter-active {
  transition: all 0.3s ease;
}
.side-panel-slide-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.side-panel-slide-enter,
.side-panel-slide-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
<style lang="scss" module>
.side-panel {
  position: fixed;
  height: 100%;
  width: $sidepanel-width;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1.75rem;
  background-color: map-get($colors, white);
  border-right: 1px solid #ccc;
  &[data-collapsed] {
    width: auto;
    min-width: $sidepanel-width--collapsed;
  }

  .side-panel__nav {
    display: block;
    height: calc(100vh - 100px);
    padding-left: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 100px;
    li {
      list-style: none;
    }
  }
}

@media (max-width: 77.5em) {
  .side-panel {
    width: $sidepanel-width2;
  }
}
@media (max-width: 48.125em) {
  .side-panel {
    padding-top: 5rem;
    z-index: 2;
    opacity: 1;
    visibility: visible;
    transition: all 0.2s;
    &:not([data-mobile-open="true"]) {
      visibility: hidden;
      transform: translateX(-10px);
      opacity: 0;
    }
  }
}
</style>
