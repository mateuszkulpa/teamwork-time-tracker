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
    const { seconds, start, pause, setSeconds } = useTimer(0);

    watch(
      () => props.entry,
      entry => {
        setSeconds(getTotalDurationForEntry(entry));
        if (entry.running) start();
        else pause();
      }
    );

    return { seconds };
  }
};
</script>
