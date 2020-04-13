<template>
  <b-autocomplete
    class="task-search"
    :data="results"
    @typing="search"
    :loading="isLoading"
    placeholder="Search task"
    icon="magnify"
    clearable
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
</template>

<script>
import { searchTasks } from "@/services/search";
export default {
  data() {
    return {
      results: [],
      isLoading: false
    };
  },
  methods: {
    async search(query) {
      if (!query || query.length < 2) return;
      this.isLoading = true;
      this.results = (await searchTasks(query)).searchResult.tasks;
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss">
.task-search {
  margin-bottom: 0.5 * $gap;
}
</style>
