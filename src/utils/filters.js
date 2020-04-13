import { format, parseJSON, addSeconds } from "date-fns";
import Vue from "vue";

export function formatTime(input) {
  return format(parseJSON(input), "HH:mm.ss");
}

export function formatSeconds(input) {
  var result = addSeconds(new Date(1970, 0, 0), Number(input));
  return format(result, "HH:mm.ss");
}

Vue.filter("formatTime", formatTime);
Vue.filter("formatSeconds", formatSeconds);
