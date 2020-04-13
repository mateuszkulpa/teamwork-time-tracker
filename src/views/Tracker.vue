<template>
  <div class="tracker-container">
    <div class="tracker">
      <task-search />
      <time-entry
        v-for="(entry, index) in parsedTimers"
        :key="index"
        :entry="entry"
      />
      <b-button class="is-white" @click="openOptionsModal">
        <b-icon pack="fas" icon="sliders-h"></b-icon>
      </b-button>
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
  mounted() {
    this.$store.dispatch("fetchTimers");
  },
  computed: {
    ...mapGetters(["parsedTimers"])
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
}
</style>
