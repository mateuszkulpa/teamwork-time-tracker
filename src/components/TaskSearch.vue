<template>
  <div class="task-search">
    <b-autocomplete
      size="is-medium"
      class="task-search__input"
      field="name"
      :data="results"
      @typing="search"
      :loading="isLoading"
      placeholder="Search task"
      icon="magnify"
      clearable
      ref="autocomplete"
      @select="option => (selected = option)"
    >
      <template slot-scope="props">
        <div class="media">
          <div class="media-content">
            <small>{{ props.option.projectName }}</small> <br />
            {{ props.option.name }}
          </div>
        </div>
      </template>
      <template slot="empty">No results found</template>
    </b-autocomplete>
    <b-button
      class="task-search__start"
      size="is-medium"
      type="is-white"
      :disabled="!selected"
      @click="createEntry"
    >
      <b-icon pack="fas" icon="stopwatch"></b-icon>
    </b-button>
  </div>
</template>

<script>
import { searchTasks } from "@/services/search";
export default {
  data() {
    return {
      results: [],
      isLoading: false,
      selected: null
    };
  },
  methods: {
    async search(query) {
      if (!query || query.length < 2) return;
      try {
        this.isLoading = true;
        this.results = (await searchTasks(query)).searchResult.tasks;
      } finally {
        this.isLoading = false;
      }
    },
    async createEntry() {
      this.$store.dispatch("createEntry", this.selected);
      this.selected = null;
    }
  }
};
</script>

<style lang="scss">
.task-search {
  display: flex;
  margin-bottom: 0.5 * $gap;
  &__input {
    flex: 1;
  }
}
</style>
