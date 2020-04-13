import Vue from "vue";

function resize(el) {
  el.style.height = "auto";
  el.style.height = el.scrollHeight + 1 + "px";
}

Vue.directive("auto-resize", {
  inserted: function(el) {
    resize(el);
    el.addEventListener("input", () => resize(el));
    el.addEventListener("change", () => resize(el));
    el.addEventListener("paste", () => resize(el));
    el.addEventListener("drop", () => resize(el));
    el.addEventListener("keydown", () => resize(el));
  },
  update: function(el) {
    resize(el);
  }
});
