<template>
  <div :class="$style['common-table']">
    <BaseRow no-gutter v-if="!noUtility">
      <BaseCol :col="{ sm: 12 }">
        <div :class="$style['common-table__utility']">
          <TableSearch :placeholder="searchPlaceholder" @search="searchHandler" />
          <TableFilter :filters="filters" @click="filterClickHandler" />
      </BaseCol>
    </BaseRow>
    <BaseRow no-gutter>
      <BaseCol :col="{ sm: 12 }" :class="$style['common-table__content']">
        <ElTable
          :data="getAlteredTableRows"
          :header-row-class-name="getHeaderClasses"
          :header-cell-class-name="$style.header__cell"
          stripe
          :style="{ width: '100%' }"
          @select="(selection, row) => $emit('select', selection, row)"
          :select-on-indeterminate="false"
          ref="tableRef"
          row-key="originatorId"
          @row-click="$emit('row-click', $event)"
        >
          <ElTableColumn v-if="rowsSelectable" type="selection" reserve-selection />
          <ElTableColumn
            v-for="col in getTableColumns"
            :key="col.name"
            :prop="col.name"
            :label="col.label"
            :sortable="col.sortable"
            :class-name="$style.cell"
          >
            <template v-slot:default="scoped">
              <div>
                <slot
                  :name="col.name"
                  v-bind="{ columnVal: scoped.row[col.name], row: scoped.row }"
                  >{{ scoped.row[col.name] }}</slot
                >
              </div>
            </template>
          </ElTableColumn>

          <ElTableColumn
            v-if="$scopedSlots.rowActions && rows"
            :class-name="$style.actions"
            width="40"
          >
            <template v-slot:default="scope">
              <slot v-bind="scope.row" name="rowActions"></slot>
            </template>
          </ElTableColumn>
        </ElTable>
      </BaseCol>
    </BaseRow>
  </div>
</template>

<script>
import { Table, TableColumn } from "element-ui";
import TableSearch from "./components/TableSearch.vue";
import TableFilter from "./components/TableFilter.vue";
import defaultUserAvatar from "@/assets/static/img/faces/face-2.jpg";

const excludedTypes = ["null", "object", "number"];

export default {
  name: "Table",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    TableSearch,
    TableFilter,
  },
  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    rowsSelectable: {
      type: Boolean,
      default: false,
    },
    filters: {
      type: Array,
    },
    searchPlaceholder: {
      type: String,
      default: "Search",
    },
    noUtility: {
      type: Boolean,
      default: false,
    },
    customSelectedRows: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tableSearchText: "",
      showFilterModal: false,
      windowSizes: [
        {
          name: "xs",
          minWidth: 0,
        },
        {
          name: "sm",
          minWidth: 576,
        },
        {
          name: "md",
          minWidth: 768,
        },
        {
          name: "lg",
          minWidth: 992,
        },
        {
          name: "xl",
          minWidth: 1200,
        },
      ],
    };
  },
  computed: {
    getAlteredTableRows() {
      const searchText = this.tableSearchText;
      return (
        (this.tableSearchText &&
          this.rows.filter((row) => {
            let isTrue = false;
            Object.values(row).forEach((item) => {
              if (typeof item === "number" && item.toString().indexOf(searchText) > -1) {
                isTrue = true;
              } else if (typeof item === "string" && item.toLowerCase().indexOf(searchText) > -1) {
                isTrue = true;
              }
            });
            return isTrue;
          })) ||
        this.rows
      );
    },
    getUserAvatar() {
      return defaultUserAvatar;
    },
    getTableColumns() {
      const sizes = ["xs", "sm", "md", "lg", "xl"];

      return this.columns.filter((el, index) => {
        if (el.hasOwnProperty("xs") && this.windowWidth < 576) {
          return true;
        }
        if (el.hasOwnProperty("sm") && this.windowWidth >= 576) {
          return true;
        }
        if (el.hasOwnProperty("md") && this.windowWidth >= 768) {
          return true;
        }
        if (el.hasOwnProperty("lg") && this.windowWidth >= 992) {
          return true;
        }
        if (el.hasOwnProperty("xl") && this.windowWidth >= 1200) {
          return true;
        }

        let none = false;
        sizes.every((prop) => {
          none = el.hasOwnProperty(prop);
        });

        return none;
      });
    },
    getHeaderClasses() {
      let classes = [this.$style.content__header];
      if (this.noUtility) {
        classes.push(this.$style["no-utility"]);
      }

      return classes.toString().replace(",", " ");
    },
  },

  methods: {
    searchHandler(text) {
      this.tableSearchText = text;
    },
    getLocalFormattedDate(time, numericMonth = false) {
      const dateTime = new Date(time * 1000);
      const options = {
        year: "numeric",
        month: numericMonth,
        day: "numeric",
      };
      return dateTime.toLocaleDateString("en-US", options);
    },
    getColWidth(col) {
      const sizes = ["xs", "sm", "md", "lg", "xl"];
      let currentSize = false;
      sizes.forEach((el, index) => {
        if (col.hasOwnProperty(el) && this.windowWidth >= this.windowSizes[index].minWidth) {
          currentSize = el;
        }
      });

      return currentSize
        ? col[currentSize].hasOwnProperty("width")
          ? col[currentSize].width
          : col.hasOwnProperty("width")
          ? col.width
          : null
        : null;
    },
    filterClickHandler() {
      this.showFilterModal = !this.showFilterModal;
    },
  },
  mounted() {
    const vm = this;
    this.customSelectedRows.forEach(function (element) {
      vm.$refs.tableRef.toggleRowSelection(element, true);
    });
  },
};
</script>

<style lang="scss" module>
.common-table {
  padding-bottom: 2rem;

  &__utility {
    display: flex;
    background: #e8eef7;
    border-radius: 4px;
    padding: 0.5rem;
    justify-content: space-between;
    font-weight: 600;

    .utility__button {
      background: #2285bf;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      color: white;
      outline: none;
      border: none;
      cursor: pointer;
      font-weight: 600;
      span {
        margin-left: 0.5rem;
      }

      &--secondary {
      }
    }
  }
  &__content {
    table {
      table-layout: fixed;
      tr td {
        cursor: pointer;
        &.cell {
          padding: 0.75rem 1rem;
          &:first-of-type {
            padding: 0.75rem 1rem 0.75rem 0.5rem;
          }

          & :global(.cell) {
            padding: 0;
            color: $font-base-color;
            .ellipsis {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }

    .content__header {
      th {
        padding: 0.9rem 1rem 0.75rem 1rem; // to offset poppins font
        font-size: 0.875rem;
        &:first-of-type {
          padding: 0.9rem 1rem 0.75rem 0.5rem;
        }

        & :global(.cell) {
          padding: 0;
        }
      }
      .header__cell {
        width: auto;
        font-size: 0.875rem;
        color: map-get($colors, light);
        text-transform: none;
        & :global(.cell) {
          font-size: 0.875rem;
          font-weight: 500;
          font-family: $primary-font;
          line-height: 1;
        }
      }
    }
  }
}

.user-container {
  display: flex;
  align-items: center;
}
.photo {
  width: 34px;
  height: 34px;
  overflow: hidden;
  float: left;
  z-index: 5;
  margin-right: 1rem;
  border-radius: 50%;
}
.user-info {
  line-height: 0.9;
}
.user-info span {
  display: inline-block;
  font-size: 0.75rem;
  color: #ccc;
  font-weight: 600;
}

@media screen and (max-width: 75em) {
  .el-table {
    font-size: 1rem;
  }
  .BaseTable .el-table ::v-deep table > thead > tr > th {
    font-size: 0.875rem;
  }
  .BaseTable .el-table ::v-deep table > thead > tr > th {
    padding: 0.75rem 0.5rem;
  }
  .BaseTable .el-table ::v-deep table > tbody > tr > td {
    padding: 0.75rem 0.5rem;
  }
}

@media screen and (max-width: 48em) {
  .BaseTable .BaseTable_Utility .Utility_Search {
    flex-grow: 1;
    margin-right: 1rem;
  }
  .BaseTable .el-table ::v-deep table > thead > tr > th {
    padding: 0.75rem 0px;
  }
  .BaseTable .el-table ::v-deep table > tbody > tr > td {
    padding: 0.75rem 0px;
  }
}
</style>
