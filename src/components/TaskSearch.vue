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
import { reactive, toRefs } from "@vue/composition-api";
import store from "@/store";

export default {
  setup() {
    const state = reactive({
      results: [],
      isLoading: false,
      selected: null
    });

    const search = async query => {
      if (!query || query.length < 2) return;
      try {
        state.isLoading = true;
        state.results = (await searchTasks(query)).searchResult.tasks;
      } finally {
        state.isLoading = false;
      }
    };

    const createEntry = async () => {
      store.dispatch("createEntry", state.selected);
      state.selected = null;
    };

    return {
      ...toRefs(state),
      search,
      createEntry
    };
  }
};
</script>

<style lang="scss">
.task-search {
  display: flex;
  &__input {
    flex: 1;
  }
}
</style>
