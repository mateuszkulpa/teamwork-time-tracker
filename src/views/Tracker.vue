<template>
  <div class="tracker-container" ref="root">
    <div class="tracker">
      <div class="tracker__header">
        <task-search class="tracker__search" />
        <time-summary class="tracker__summary" />
      </div>

      <div
        class="has-text-danger has-text-centered"
        v-if="!isRequiredOptionsProvided"
      >
        Provide TeamWork domain and API KEY
      </div>

      <div class="tracker__entries" ref="trackerEntries">
        <time-entry
          v-for="entry in parsedTimers"
          :key="entry.id"
          :entry="entry"
        />
      </div>

      <div class="tracker__footer">
        <div>
          <b-button class="is-white" @click="openOptionsModal">
            <b-icon pack="fas" icon="cogs"></b-icon>
          </b-button>
          <b-button class="is-white" @click="openRecentTasksModal">
            recent tasks
          </b-button>
        </div>

        <b-button
          tag="a"
          target="_blank"
          class="is-white"
          href="https://github.com/mateuszkulpa/teamwork-time-tracker"
        >
          <b-icon pack="fab" icon="github"></b-icon>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Options from "@/components/Options";
import RecentTasks from "@/components/RecentTasks";
import TimeEntry from "@/components/TimeEntry";
import TaskSearch from "@/components/TaskSearch";
import TimeSummary from "@/components/TimeSummary";
import { ModalProgrammatic } from "buefy";
import { ref, computed } from "@vue/composition-api";
import store from "@/store";

export default {
  name: "Tracker",
  components: {
    TimeEntry,
    TaskSearch,
    TimeSummary
  },
  setup() {
    const root = ref(null);

    store.dispatch("fetchTimers");

    const openOptionsModal = () => {
      ModalProgrammatic.open({
        component: Options
      });
    };

    const openRecentTasksModal = () => {
      ModalProgrammatic.open({
        component: RecentTasks,
        fullScreen: true,
        customClass: "fullscreen-modal"
      });
    };

    const parsedTimers = computed(() => store.getters.parsedTimers);
    const isRequiredOptionsProvided = computed(
      () => store.getters.isRequiredOptionsProvided
    );

    return {
      root,
      openOptionsModal,
      openRecentTasksModal,
      parsedTimers,
      isRequiredOptionsProvided
    };
  }
};
</script>

<style lang="scss" scoped>
.tracker-container {
  background: $primary;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.tracker {
  background: $white;
  padding: 0.5 * $gap;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @include desktop() {
    margin-top: $gap;
    padding: $gap;
    max-width: $desktop;
    border-radius: $radius;
    min-height: unset;
  }

  &__header {
    display: flex;
    margin-bottom: 0.5 * $gap;
  }

  &__search {
    flex: 1;
  }

  &__summary {
    font-size: $size-4;
    display: flex;
    align-items: center;

    @include mobile() {
      font-size: $size-6;
    }
  }

  &__entries {
    position: relative;
    min-height: 3 * $gap;
    flex: 1;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
}
</style>
