<template>
  <span>{{ totalSeconds | formatSeconds }}</span>
</template>

<script>
import { differenceInSeconds, parseJSON } from "date-fns";
let interval;
export default {
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      now: new Date()
    };
  },
  created() {
    interval = setInterval(() => {
      if (this.entry.running) this.now = new Date();
    }, 1000);
  },
  computed: {
    totalSeconds() {
      let total = this.entry.intervals.reduce((a, b) => a + b.duration, 0);
      if (this.entry.running) {
        const lastInterval = [...this.entry.intervals].pop();
        total += differenceInSeconds(this.now, parseJSON(lastInterval.from));
      }
      return total;
    }
  },
  destroyed() {
    clearInterval(interval);
  }
};
</script>
