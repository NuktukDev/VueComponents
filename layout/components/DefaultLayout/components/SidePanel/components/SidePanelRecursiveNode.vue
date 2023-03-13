<template>
  <div :class="[$style['side-panel__item'], isActive && $style.active]">
    <!-- Link|Parent Node -->
    <component
      :is="getNodeComponent"
      v-bind="getNodeComponentProps"
      v-on="getNodeComponentListeners"
    />

    <!-- Parent container div for children -->
    <template v-if="hasChildren">
      <!--
        Keep repeating self until no more children left
      -->
      <SidePanelRecursiveNode
        v-for="(child, i) in node.children"
        :key="`${child.text}${i}`"
        :node="child"
        v-show="nodeCollapsed"
      />
    </template>
  </div>
</template>

<script>
import { CollapseTransition } from "vue2-transitions";
import SidePanelParentNode from "./SidePanelParentNode.vue";
import SidePanelLink from "./SidePanelLink.vue";

export default {
  name: "SidePanelRecursiveNode",
  components: {
    CollapseTransition,
  },
  props: ["node", "nodeIconOnly"], // side menu different from parent node collapse
  data() {
    return {
      nodeCollapsed: false,
    };
  },
  computed: {
    hasChildren() {
      const { children } = this.node;
      return children && children.length > 0;
    },
    getNodeComponent() {
      return this.hasChildren ? SidePanelParentNode : SidePanelLink;
    },
    getNodeComponentProps() {
      const propsObj = {
        node: this.node,
      };

      if (!this.hasChildren) {
        propsObj.active = this.isActive;
        propsObj.iconOnly = this.nodeIconOnly;
      }
      return propsObj;
    },
    getNodeComponentListeners() {
      return this.hasChildren ? { click: this.collapseNode } : {}; // node collapse different from side menu collapse
    },
    isActive() {
      return this.$route.path.startsWith(this.node.path);
    },
  },
  methods: {
    collapseNode() {
      this.nodeCollapsed = !this.nodeCollapsed;
    },
  },
};
</script>
<style lang="scss" module>
.side-panel__item {
  margin: 0 0 0.5rem 0;
  &.active {
    background-color: #f4eeff;
    border-radius: 0.5rem;
  }
}
</style>
