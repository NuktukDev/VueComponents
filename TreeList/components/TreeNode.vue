<template>
  <li :class="$style.ListItem">
    <BaseButton
      :textOnly="true"
      :class="$style.RowButton"
      @dblclick.stop="handleRowDoubleClick"
      @click="handleRowClick"
    >
      <div :class="getContentClasses">
        <div :class="$style.ItemBox">
          <span :class="getIconClasses">{{ getIcon }}</span>
          <span :class="$style.Content__Label">{{ getLabel }}</span>
          <BaseButton :textOnly="true" v-if="getList.length" @click="handleArrowClick">
            <span :class="getArrowClasses">arrow_right</span>
          </BaseButton>
        </div>
      </div>
    </BaseButton>
    <ul :class="$style.ListItem__Children" v-show="opened">
      <template v-for="(node, i) in getList">
        <TreeNode
          :node="node"
          :key="`${node.label}${i}`"
          :selectedNodeId="selectedNodeId"
          @rowClick="$emit('rowClick', $event)"
        />
      </template>
    </ul>
  </li>
</template>

<script>
import RightArrow from "../assets/svg/right-arrow.svg";

const Icon = `<span class="material-symbols-rounded">__icon__</span>`;
export default {
  name: "TreeNode",
  components: { RightArrow },
  props: ["node", "selectedNodeId"],
  data() {
    return {
      opened: false,
    };
  },
  computed: {
    getTreeNodeClasses() {
      return {
        [this.$style.TreeNode]: true,
      };
    },
    getContentClasses() {
      return {
        [this.$style.ListItem__Content]: true,
        [this.$style.Highlighted]: this.selectedNodeId === this.node.id ? true : false,
      };
    },
    getIcon() {
      return this.node?.icon ?? "category";
    },
    getIconClasses() {
      return ["material-symbols-rounded", this.$style.Icon];
    },
    getLabel() {
      return this.node?.label ?? "List";
    },
    getArrowClasses() {
      return [
        "material-symbols-rounded",
        this.$style.ArrowRight,
        this.getList.length > 0 && this.opened ? this.$style.Rotate90d : "",
      ];
    },
    getList() {
      return this.node?.list ?? [];
    },
  },

  methods: {
    handleRowClick({ target }) {
      if (target?.classList?.contains(this.$style.ArrowRight)) return;

      this.$emit("rowClick", this.node.id);
    },
    handleRowDoubleClick(event) {
      if (event.target?.classList?.contains(this.$style.ArrowRight)) return;

      this.toggleExpand();
    },
    handleArrowClick() {
      this.toggleExpand();
    },
    toggleExpand() {
      console.log("test");
      this.opened = !this.opened;
    },
  },
};
</script>

<style lang="scss" module>
.ListItem {
  margin: 0;
  padding: 0;
  list-style-type: none;
  .RowButton {
    display: block;
    width: 100%;
    .ListItem__Content {
      &.Highlighted {
        .ItemBox {
          background-color: #fdf1f1;
          border-radius: 0.25rem;
        }
      }
      .ItemBox {
        display: flex;
        position: relative;
        width: 100%;
        height: 42px;
        margin: 0;
        padding: 0 0.75rem;
        align-items: center;
      }
      color: #5a5a5a;
      cursor: pointer;
      .Content__Label {
        padding: 5px 0 0 0.5rem;
        font-weight: 600;
      }
    }
  }
  &__Children {
    margin: 0;
    padding: 0;
    & .ListItem__Children .ListItem {
      margin: 0 0 0 3.5rem;
    }
  }

  &__Children .ListItem {
    &:last-child {
      border-left: 2px solid transparent;
      & > .RowButton .ListItem__Content::before {
        border-bottom-left-radius: 0.5rem;
      }
    }
    border-left: 2px solid #575757;
    margin: 0;
    padding: 0;
    margin-left: 1.75rem;

    & > .RowButton .ListItem__Content {
      &::before {
        position: absolute;
        top: 0;
        left: -2px;
        width: 1.5rem;
        bottom: 45%;
        content: "";
        border: 2px solid #575757;
        border-top: 0 none transparent;
        border-right: 0 none transparent;
      }

      position: relative;
      margin: 0;
      padding: 0 0 0 1.85rem;
    }
  }
}

.ArrowRight {
  font-size: 2rem;
  padding-top: 7px;
  margin-left: -4px;
  color: #575757;
  user-select: none; /* standard syntax */
  -webkit-user-select: none; /* webkit (safari, chrome) browsers */
  -moz-user-select: none; /* mozilla browsers */
  -khtml-user-select: none; /* webkit (konqueror) browsers */
  -ms-user-select: none; /* IE10+ */
}
.Rotate90d {
  transform: rotate(90deg);
  padding-top: 8px;
  padding-left: 7px;
}
.Icon {
  font-size: 1.75rem;
  color: #666666;
}
</style>
