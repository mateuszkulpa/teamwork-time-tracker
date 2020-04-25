import { differenceInSeconds, parseJSON } from "date-fns";

export function getTotalDurationForEntry(entry) {
  if (!entry.running) return entry.duration;
  const lastInterval = [...entry.intervals].pop();
  return (
    entry.duration +
    differenceInSeconds(new Date(), parseJSON(lastInterval.from))
  );
}

export function getTotalDurationForEntries(entries) {
  return entries.reduce(
    (acc, entry) => acc + getTotalDurationForEntry(entry),
    0
  );
}

export function isAnyEntryRunning(entries) {
  return entries.some(entry => entry.running);
}
