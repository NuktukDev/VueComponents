<template>
  <div :class="$style.wrapper">
    <!--- Header Nav Section --->
    <Header
      :expanded="getLayoutExpanded"
      :isSearchBarOpen="getIsSearchBarOpen"
      :noSidePanel="noSidePanel"
      @click="handleHeaderCollapseButtonClick"
      @searchBarFocus="isSearchBarOpen = true"
      @searchBarBlur="isSearchBarOpen = false"
      @mobileMenuClick="mobileMenuOpen = !mobileMenuOpen"
    >
      <template #logo>
        <Logo :size="getLayoutExpanded && 'small'" />
      </template>
    </Header>
    <!--- Header Nav Section --->

    <!-- Side Panel Section --->
    <SidePanel
      data-color="white"
      :sidePanelNodes="sidePanelLinks"
      :collapsed="!getMobileMenuOpen && getSideBarCollapsed"
      :mobileOpen="getMobileMenuOpen"
      v-if="!noSidePanel"
    >
      <!--- User Links --->
      <UserDropdown :userNodes="userNodes" :isCollapsed="getLayoutExpanded" />
      <!--- End User Link --->

      <BaseSpacer />
    </SidePanel>
    <!--- End Side Panel Section --->

    <!--- Content Section --->
    <div
      :class="$style['main-panel']"
      :data-expanded="getLayoutExpanded"
      :data-layout-side-panel="!noSidePanel"
    >
      <slot>404</slot>
    </div>
    <!--- End Content Section --->
  </div>
</template>

<script>
import collapseHandler from "@/utils/handle-header-collapse-click";

import Logo from "@/layout/components/shared/Logo.vue";
import Header from "./components/Header";
import SidePanel from "./components/SidePanel";
import UserDropdown from "./components/UserDropdown";
import UserNodes from "./components/UserDropdown/static/userDropdownNodes.json";

export default {
  components: { Header, Logo, SidePanel, UserDropdown },
  props: ["noSidePanel"],
  data() {
    return {
      windowWidth: window.innerWidth,
      sidePanelLinks: [
        {
          text: "[redacted]",
          icon: "[redacted]",
          path: "[redacted]",
        },
        {
          text: "[redacted]",
          icon: "[redacted]",
          path: "[redacted]",
        },
      ],
      userNodes: UserNodes,
      layoutExpanded: localStorage.getItem("layoutExpanded") === "true", // default to true if localStorage not set
      isSearchBarOpen: false,
      mobileMenuOpen: false,
    };
  },
  computed: {
    getLayoutExpanded() {
      return this.windowWidth <= 1050 || this.layoutExpanded;
    },
    getSideBarCollapsed() {
      return (
        (this.windowWidth > 770 && this.windowWidth <= 1050) ||
        this.layoutExpanded
      );
    },
    getMobileMenuOpen() {
      return this.windowWidth <= 770 && this.mobileMenuOpen;
    },
    getIsSearchBarOpen() {
      return this.isSearchBarOpen || this.windowWidth > 770;
    },
  },

  watch: {
    $route(to, from) {
      Object.assign(this.$data, this.$options.data.apply(this));
    },
  },

  methods: {
    handleHeaderCollapseButtonClick() {
      collapseHandler();
      this.layoutExpanded = !this.layoutExpanded;
    },
    handleWindowResize() {
      this.windowWidth = window.innerWidth;
    },
  },

  mounted() {
    window.addEventListener("resize", this.handleWindowResize);
  },
  unmounted() {
    window.removeEventListener("resize");
  },
};
</script>

<style lang="scss" module>
.wrapper {
  position: relative;
  .main-panel {
    &[data-expanded] {
      &[data-layout-side-panel] {
        margin-left: 6rem;
        width: auto;
      }
    }

    &[data-layout-side-panel="true"] {
      width: calc((80% - $sidepanel-width));
      margin-left: $sidepanel-width;
      padding: 2rem;
    }

    width: auto;
    margin: 0;
    padding: 2rem;
  }
}

@media (max-width: 93.5em) {
  .wrapper {
    .main-panel {
      &[data-layout-side-panel="true"] {
        width: auto;
      }
    }
  }
}
@media (max-width: 77.5em) {
  .wrapper {
    .main-panel {
      &[data-layout-side-panel="true"] {
        margin-left: $sidepanel-width2;
        padding: 1rem;
      }
    }
  }
}

@media (max-width: 48.125em) {
  .wrapper {
    .main-panel {
      padding: 0.5rem;
      margin-left: 0;
      &[data-expanded] {
        &[data-layout-side-panel="true"] {
          padding: 0.75rem;
          margin: 0;
        }
      }
    }
  }
}
</style>
