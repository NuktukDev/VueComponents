<template>
  <div :class="$style.TreeListContainer">
    <ul>
      <TreeNode :node="sampleList" :selectedNodeId="selectedNodeId" @rowClick="handleRowClick" />
    </ul>
  </div>
</template>

<script>
import { searchTree } from "@/utils/search-tree";
import TreeNode from "./components/TreeNode.vue";

const unitIcon = "account_tree";
const sampleList = {
  label: "My First Node",
  icon: "domain",
  id: "org1",
  list: [
    {
      label: "My First nested node",
      icon: unitIcon,
      id: "unit1",
      list: [
        {
          label: "Another Nested",
          icon: unitIcon,
          id: "unit1-1",
        },
        {
          label: "Another Other Nested",
          icon: unitIcon,
          id: "unit1-2",
        },
      ],
    },
    {
      label: "My Second nested node",
      icon: unitIcon,
      id: "unit2",
      list: [
        {
          label: "Another Nested",
          icon: unitIcon,
          id: "unit2-1",
        },
        {
          label: "Another Other Nested",
          icon: unitIcon,
          id: "unit2-2",
        },
      ],
    },
  ],
};
export default {
  name: "TreeList",
  components: { TreeNode },
  props: [],

  data() {
    return {
      selectedNodeId: 0,
      sampleList,
    };
  },
  computed: {
    getSelectedNode() {
      return { ...searchTree(this.sampleList, "id", this.selectedNodeId) };
    },
  },

  methods: {
    clearSelected() {
      /* Keeping here incase need to add multiple selections */
      this.selectedNodeId = 0;
    },
    handleRowClick(nodeId, selected) {
      const selectedId = this.selectedNodeId;
      this.clearSelected();

      if (selectedId === nodeId) {
        this.$emit("update", null);
        return;
      }
      this.selectedNodeId = nodeId;

      this.$emit("update", this.getSelectedNode);
    },
  },
};
</script>

<style lang="scss" module>
.TreeListContainer {
  padding: 1rem 0;
}
</style>
