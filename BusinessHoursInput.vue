<template>
  <div :class="$style.BusinessHours">
    <span :class="$style.title">{{ title }}</span>
    <div :class="$style['switch-container']">
      <ElSwitch v-model="isActive" />
      <span :class="$style.status">{{ isActive ? "Open" : "Closed" }}</span>
    </div>
    <div v-show="isActive" :class="$style.BusinessHours__selects">
      <div :class="$style.selects__item">
        <v-select
          placeholder="Open Time"
          label="title"
          :options="$options.selectableTimes"
          v-model="getOpenTime"
          taggable
        ></v-select>
      </div>
      <div :class="$style.selects__item">
        <v-select
          placeholder="Close Time"
          label="title"
          :options="$options.selectableTimes"
          v-model="getCloseTime"
          taggable
        >
        </v-select>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { Switch } from "element-ui";

const selectableTimes = [];
for (let i = 1; i <= 24; i++) {
  const time = i > 12 ? i - 12 : i;
  const period = i > 12 ? "PM" : "AM";
  selectableTimes.push(`${time}:00 ${period}`);
  selectableTimes.push(`${time}:30 ${period}`);
}

export default {
  components: {
    vSelect,
    [Switch.name]: Switch,
  },
  props: ["title", "active", "openTime", "closeTime"],
  selectableTimes,
  computed: {
    isActive: {
      get() {
        return this.active;
      },
      set(val) {
        this.handleSwitchClick(val);
      },
    },
    getOpenTime: {
      get() {
        return this.openTime;
      },
      set(val) {
        this.handleChange("openTime", val);
      },
    },
    getCloseTime: {
      get() {
        return this.closeTime;
      },
      set(val) {
        this.handleChange("closeTime", val);
      },
    },
    getAllTimes() {
      return [this.openTime, this.closeTime];
    },
  },
  methods: {
    async handleChange(field, val) {
      this.$emit("change", field, val);
    },
    handleSwitchClick(val) {
      this.$emit("activeChange", val);
    },
  },
};
</script>

<style lang="scss" module>
$medium-size: 900px;

.BusinessHours {
  display: flex;
  align-items: center;
  height: 1.75rem;
  margin-top: 1.25rem;
  :global {
    .vue__time-picker {
      .dropdown {
        height: 10em;
        background-color: transparent;
        .select-list {
          height: 10.5em;
          overflow: hidden;
          box-shadow: inset 0px 11px 8px -10px #ccc;
          ul {
            height: 10em;
            box-shadow: inset 0px 11px 8px -10px #ccc,
              inset 0px -11px 8px -10px #ccc;
            .active {
              background: #806dc9;
            }
            .active:hover {
              background: #8b80b9;
            }
          }
          ul::-webkit-scrollbar {
            display: none; /* Safari and Chrome */
          }
        }
      }
    }
    .el-input__inner {
      width: 8rem;
    }
  }
  .title {
    font-size: 1rem;
    min-width: 5rem;
    margin-right: 3.5rem;
  }
  .switch-container {
    display: flex;
    align-items: center;
    margin-right: 2.5rem;
    :global {
      .el-switch {
        margin-top: 2px;
      }
    }
    .status {
      margin-left: 0.5rem;
    }
  }
  &__selects {
    display: flex;
    .selects__item {
      min-width: 10rem;
      &:first-of-type {
        margin-right: 1rem;
      }
    }
  }
  .input-divider {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
@media (max-width: $medium-size) {
  .BusinessHours {
    flex-direction: column;
    height: 5rem;
    align-items: flex-start;
    margin-top: 2rem;
    margin-bottom: 2rem;
    .title {
      margin: 0;
      margin-bottom: 0.5rem;
    }
    .switch-container {
      margin: 0;
      margin-bottom: 0.5rem;
    }
  }
}
</style>
