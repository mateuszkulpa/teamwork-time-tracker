import { ref, onUnmounted, onMounted } from "@vue/composition-api";

export default function(initialSeconds, running) {
  const seconds = ref(initialSeconds);
  const enabled = ref(running);

  let interval;
  onMounted(() => {
    interval = setInterval(() => {
      if (enabled.value) seconds.value++;
    }, 1000);
  });
  onUnmounted(() => {
    clearInterval(interval);
  });

  const start = () => {
    enabled.value = true;
  };
  const pause = () => {
    enabled.value = false;
  };

  return { seconds, start, pause };
}
