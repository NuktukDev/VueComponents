<template>
  <div class="user-dropdown">
    <div :class="$style['user-dropdown__button-container']">
      <button
        :class="$style['button-container__button']"
        @click="collapsed = !collapsed"
      >
        <div :class="$style['button__user-info']">
          <img :src="getUserUrl" alt="user avatar" />
          <span v-if="!isCollapsed">{{ getUserName }}</span>
        </div>
        <i
          :class="[
            'el-icon-caret-bottom',
            'el-icon--right',
            'button-rotate',
            collapsed && 'active',
          ]"
          v-if="!isCollapsed"
        ></i>
      </button>
    </div>
    <ElCollapseTransition>
      <ul :class="$style['user-dropdown__list']" v-show="collapsed">
        <li v-for="(node, i) in userNodes" :key="`${node.text}${i}`">
          <SidePanelLink :node="node" />
        </li>
      </ul>
    </ElCollapseTransition>
  </div>
</template>

<script>
import SidePanelLink from "@/layout/components/DefaultLayout/components/SidePanel/components/SidePanelLink.vue";
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";

// remove in future
const faces = ["face-2", "face-3", "joe-gardner-2", "kaci-baum-2"];
const getRandomFace = () => faces[Math.floor(Math.random() * faces.length)];
const path = `/src/assets/static/img/faces/${getRandomFace()}.jpg`;
const globFaces = import.meta.glob("@/assets/static/img/faces/*", {
  eager: true,
});
const userRandomImage = globFaces[path].default;
// end remove in future

import { useUserStore } from "@/store/user";

const userStore = useUserStore();

export default {
  components: { SidePanelLink, [CollapseTransition.name]: CollapseTransition },
  props: ["userNodes", "isCollapsed"],
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    getUserUrl() {
      return userRandomImage;
    },
    getUserName() {
      return userStore.getFullName;
    },
  },
};
</script>

<style lang="scss" module>
:global {
  .button-rotate {
    &.active {
      -webkit-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      -o-transform: rotate(90deg);
      transform: rotate(90deg);
      transition: all 0.3s ease;
    }
  }
}
.user-dropdown {
  &__list {
    padding: 1rem 0.75rem 0 0.75rem;
    margin: 0;
    list-style: none;

    li {
      a {
        padding: 0.25rem;
        font-size: 0.9rem;
      }
    }
  }
}
.user-dropdown__button-container {
  padding: 0 0.5rem;
  font-family: "Poppins", sans-serif;
  font-size: 0.85rem;

  .button-container__button {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    outline: none;
    border: none;
    background: none;
    text-align: right;
    cursor: pointer;

    .button__user-info {
      text-align: left;
      img {
        display: inline-block;
        width: 34px;
        height: 34px;
        overflow: hidden;
        border-radius: 50%;
        vertical-align: middle;
      }
      span {
        margin-left: 1rem;
      }
    }
    i {
      padding-bottom: 0.2rem;
    }
  }
}
</style>
