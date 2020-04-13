import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Buefy from "buefy";
import VueCompositionApi from "@vue/composition-api";
import "@/styles/main.scss";
import "@/utils/filters";
Vue.config.productionTip = false;

Vue.use(VueCompositionApi);
Vue.use(Buefy);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
