<template>
  <div class="time-entry">
    <div class="time-entry__options">
      <b-dropdown>
        <button class="button is-white" slot="trigger">
          <b-icon pack="fas" icon="ellipsis-v" type="is-info"></b-icon>
        </button>

        <b-dropdown-item @click="complete">Complete</b-dropdown-item>
        <b-dropdown-item @click="collapsed = !collapsed">
          <span v-if="collapsed">Show</span>
          <span v-else>Hide</span>
          intervals
        </b-dropdown-item>
        <b-dropdown-item @click="remove">Delete</b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="time-entry__info">
      <a
        class="time-entry__project"
        :href="`${options.teamworkDomain}/#/projects/${entry.project.id}`"
        target="_blank"
      >
        {{ entry.project.name }}
      </a>
      <a
        class="time-entry__task"
        :href="`${options.teamworkDomain}/#/tasks/${entry.task.id}`"
        target="_blank"
      >
        {{ entry.task.name }}
      </a>
      <textarea
        v-auto-resize
        class="time-entry__description"
        v-model="entry.description"
        @input="update"
      ></textarea>
    </div>
    <div class="time-entry__actions">
      <div class="time-entry__total">
        <entry-total :entry="entry" />
      </div>
      <b-button
        v-if="entry.running"
        type="is-white is-medium is-rounded"
        @click="pause"
      >
        <b-icon pack="fas" icon="pause"></b-icon>
      </b-button>
      <b-button v-else type="is-white is-medium is-rounded" @click="resume">
        <b-icon pack="fas" icon="play"></b-icon>
      </b-button>
    </div>
    <div class="time-entry__intervals" v-if="!collapsed">
      <interval-entry
        v-for="(interval, index) in entry.intervals"
        :key="index"
        :interval="interval"
      />
    </div>
  </div>
</template>

<script>
import IntervalEntry from "@/components/IntervalEntry";
import EntryTotal from "@/components/EntryTotal";
import * as timeTrackingServices from "@/services/timeTracking";
import debounce from "lodash.debounce";
import store from "@/store";
import { ref, computed } from "@vue/composition-api";
import { DialogProgrammatic as Dialog } from "buefy";

export default {
  components: { IntervalEntry, EntryTotal },
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  setup({ entry }) {
    const collapsed = ref(true);

    const pause = async () => {
      await timeTrackingServices.pause(entry);
      store.dispatch("fetchTimers");
    };

    const resume = async () => {
      await timeTrackingServices.resume(entry);
      store.dispatch("fetchTimers");
    };

    const remove = async () => {
      Dialog.confirm({
        message: "Are you sure to delete this time entry?",
        onConfirm: async () => {
          await timeTrackingServices.remove(entry);
          store.dispatch("fetchTimers");
        }
      });
    };

    const complete = async () => {
      await timeTrackingServices.complete(entry);
      store.dispatch("fetchTimers");
    };

    const update = debounce(async function() {
      timeTrackingServices.update(entry);
    }, 1000);

    const options = computed(() => store.getters.options);

    return {
      pause,
      resume,
      remove,
      complete,
      update,
      collapsed,
      options
    };
  }
};
</script>

<style lang="scss" scoped>
.time-entry {
  position: relative;
  border: 1px solid rgba($primary, 0.25);
  border-radius: $radius;
  padding: 0.25 * $gap;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.5 * $gap;

  &__options {
    display: flex;
    align-items: center;
    @include mobile() {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  &__info {
    flex: 1;
    @include mobile() {
      flex-basis: 100%;
    }
  }
  &__project {
    display: block;
    font-size: $size-7;
    color: $black;
  }
  &__task {
    display: block;
    font-weight: $weight-bold;
    color: $black;
  }
  &__description {
    font-size: $size-7;
    color: $grey;
    white-space: pre-line;
    border: none;
    background: none;
    width: 100%;
    resize: none;
    overflow: hidden;
    &:focus {
      outline: none;
      border-bottom: 2px solid $primary;
    }
  }
  &__actions {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    @include mobile() {
      justify-content: space-between;
    }
  }
  &__total {
    margin-right: 0.5 * $gap;
  }
  &__intervals {
    width: 100%;
  }
}
</style>
