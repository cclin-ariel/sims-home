import Vue from "vue";
import Vuex from "vuex";
import store from "./store";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import "./assets/tailwind.css";
import router from "./router";

//filter
import currency from "./filters/currency";
import date from "./filters/date";
import {
  // validate
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
localize("en", en);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.filter("currency", currency); // (filterName, importName)
Vue.filter("date", date); // (filterName, importName)
Vue.config.productionTip = false;
Vue.use(VueAxios, axios, Vuex);
axios.defaults.withCredentials = true;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
