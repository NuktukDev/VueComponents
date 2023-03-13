<template>
  <div :class="$style.header__utility">
    <form :class="$style.utility__form">
      <SearchBar
        :class="$style.utility__search"
        :closed="!isSearchBarOpen"
        @focus="$emit('searchBarFocus')"
        @blur="$emit('searchBarBlur')"
      />
    </form>

    <div :class="$style.utility__notifications">
      <ElDropdown>
        <span :class="$style.notifications__text">
          <span
            :class="[
              'material-symbols-rounded',
              $style.notifications__icon,
              $style['btn-rotate'],
            ]"
            >notifications</span
          ><i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <ElDropdownMenu slot="dropdown">
          <ElDropdownItem>Action 1</ElDropdownItem>
          <ElDropdownItem>Action 2</ElDropdownItem>
          <ElDropdownItem>Action 3</ElDropdownItem>
        </ElDropdownMenu>
      </ElDropdown>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import { Dropdown, DropdownMenu, DropdownItem, Input } from "element-ui";

export default {
  components: {
    [Dropdown.name]: Dropdown,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Input.name]: Input,
    SearchBar,
  },
  props: ["isSearchBarOpen"],
};
</script>

<style lang="scss" module>
.header__utility {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .utility__search {
  }

  .utility__notifications {
    margin-left: 1rem;
    .btn-rotate {
      transition: all 0.3s ease;
    }
    &:hover {
      .btn-rotate {
        -webkit-transform: rotate(60deg);
        -ms-transform: rotate(60deg);
        -o-transform: rotate(60deg);
        transform: rotate(60deg);
        transition: all 0.3s ease;
      }
    }
    .notifications__text {
      display: flex;
      align-items: center;
      color: map-get($colors, white);
      cursor: pointer;
      padding-top: 0.25rem;
    }
  }
}
@media (max-width: 65.625em) {
  .header__utility {
    width: 100%;
    .utility__form {
    }
    .utility__search {
    }
    .notifications__text {
      .notifications__icon {
        font-size: 2rem;
      }
    }
  }
}
@media (max-width: 48.125em) {
  .header__utility {
    position: relative;
    .utility__form {
    }
    .utility__search {
      //display: none;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      &:not([data-closed="true"]) {
        z-index: 12;
        box-shadow: 0px -19px 87px 65px rgba(0, 0, 0, 0.75);
      }
    }
  }
}
</style>
