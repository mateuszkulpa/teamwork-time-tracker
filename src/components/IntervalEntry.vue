<template>
  <div class="interval-entry">
    {{ interval.from | formatTime }} - {{ interval.to | formatTime }} |
    {{ interval.duration | formatSeconds }}
  </div>
</template>

<script>
export default {
  props: {
    interval: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.interval-entry {
  text-align: right;
  color: $grey;
  font-family: $family-monospace;
}
</style>
