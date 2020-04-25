<template>
  <section class="section has-background-white">
    <h3 class="has-text-centered is-size-5">Recent tasks</h3>
    <div v-for="task in recentTasks" :key="task.id" class="task">
      <div class="task__info">
        <div class="is-size-7">{{ task.project.name }}</div>
        <div class="is-size-6">{{ task.task.name }}</div>
      </div>
      <div>
        <b-button class="is-white" @click="createEntry(task)">
          <b-icon pack="fas" icon="stopwatch"></b-icon>
        </b-button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "@vue/composition-api";
import { allTimeEntries } from "@/services/timeTracking";
import store from "@/store";
import uniqBy from "lodash.uniqby";
export default {
  setup(props, context) {
    const recentTasks = ref([]);

    const removeDuplicatedEntries = entries => {
      return uniqBy(entries, "taskId");
    };

    const updateEntryWithIncluded = (entry, included) => {
      const project = included.projects[entry.projectId];
      const task = included.tasks[entry.taskId];
      entry.project = project;
      entry.task = task;
      return entry;
    };

    allTimeEntries().then(response => {
      const entriesWithoutDuplicates = removeDuplicatedEntries(
        response.timelogs
      );
      recentTasks.value = entriesWithoutDuplicates.map(entry =>
        updateEntryWithIncluded(entry, response.included)
      );
    });

    const createEntry = entry => {
      store.dispatch("createEntry", {
        id: entry.taskId,
        projectId: entry.projectId
      });

      context.parent.close();
    };

    return { recentTasks, createEntry };
  }
};
</script>

<style lang="scss" scoped>
.task {
  display: flex;
  margin: 0.5 * $gap 0;
  &__info {
    flex: 1;
  }
}
</style>
