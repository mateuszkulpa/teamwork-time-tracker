<template>
  <div>{{ seconds | formatSeconds }}</div>
</template>

<script>
import { watch } from "@vue/composition-api";
import store from "@/store";
import {
  getTotalDurationForEntries,
  isAnyEntryRunning
} from "@/utils/entriesUtils";
import useTimer from "@/usables/useTimer";
export default {
  setup() {
    const { seconds, start, pause, setSeconds } = useTimer(0);

    watch(
      () => store.getters.parsedTimers,
      updatedTimers => {
        setSeconds(getTotalDurationForEntries(updatedTimers));
        if (isAnyEntryRunning(updatedTimers)) start();
        else pause();
      }
    );

    return { seconds };
  }
};
</script>
