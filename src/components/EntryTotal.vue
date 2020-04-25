<template>
  <span>{{ seconds | formatSeconds }}</span>
</template>

<script>
import useTimer from "@/usables/useTimer";
import { getTotalDurationForEntry } from "@/utils/entriesUtils";
import { watch } from "@vue/composition-api";

export default {
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { seconds, start, pause } = useTimer(
      getTotalDurationForEntry(props.entry),
      props.entry.running
    );

    watch(
      () => props.entry.running,
      running => {
        if (running) start();
        else pause();
      }
    );

    return { seconds };
  }
};
</script>
