<template>
  <div class="tracker-container">
    <div class="tracker">
      <task-search />

      <div
        class="has-text-danger has-text-centered"
        v-if="!isRequiredOptionsEntered"
      >
        Provide TeamWork domain and API KEY and reload page
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
import { mapGetters } from "vuex";
export default {
  name: "Tracker",
  components: {
    TimeEntry,
    TaskSearch
  },
  methods: {
    openOptionsModal() {
      ModalProgrammatic.open({
        parent: this,
        component: Options
      });
    }
  },
  async mounted() {
    if (!this.isRequiredOptionsEntered) return;
    const loadingComponent = this.$buefy.loading.open({
      container: this.$refs.trackerEntries
    });
    await this.$store.dispatch("fetchTimers");
    loadingComponent.close();
  },
  computed: {
    ...mapGetters(["parsedTimers", "isRequiredOptionsEntered"])
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
