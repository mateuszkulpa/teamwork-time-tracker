<template>
  <div class="tracker-container" ref="root">
    <div class="tracker">
      <task-search />

      <div
        class="has-text-danger has-text-centered"
        v-if="!isRequiredOptionsProvided"
      >
        Provide TeamWork domain and API KEY
      </div>

      <div class="tracker__entries" ref="trackerEntries">
        <time-entry
          v-for="(entry, index) in parsedTimers"
          :key="index"
          :entry="entry"
        />
      </div>

      <div>
        <b-button class="is-white" @click="openOptionsModal">
          <b-icon pack="fas" icon="cogs"></b-icon>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Options from "@/components/Options";
import TimeEntry from "@/components/TimeEntry";
import TaskSearch from "@/components/TaskSearch";
import { ModalProgrammatic } from "buefy";
// import { mapGetters } from "vuex";
import { ref, computed } from "@vue/composition-api";
import store from "@/store";
export default {
  name: "Tracker",
  components: {
    TimeEntry,
    TaskSearch
  },
  setup() {
    const root = ref(null);

    store.dispatch("fetchTimers");

    const openOptionsModal = () => {
      ModalProgrammatic.open({
        component: Options
      });
    };

    const parsedTimers = computed(() => store.getters.parsedTimers);
    const isRequiredOptionsProvided = computed(
      () => store.getters.isRequiredOptionsProvided
    );

    return {
      root,
      openOptionsModal,
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

  @include desktop() {
    margin-top: $gap;
    padding: $gap;
    max-width: $desktop;
    border-radius: $radius;
    min-height: unset;
  }

  &__entries {
    position: relative;
    min-height: 3 * $gap;
  }
}
</style>
