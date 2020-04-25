import { differenceInSeconds, parseJSON } from "date-fns";

export function getTotalDurationForEntry(entry) {
  if (!entry.running) return entry.duration;
  const lastInterval = [...entry.intervals].pop();
  return (
    entry.duration +
    differenceInSeconds(new Date(), parseJSON(lastInterval.from))
  );
}
