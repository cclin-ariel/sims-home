import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/tailwind.css'
import router from './router'

//filter
import currency from './filters/currency'
import date from './filters/date'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

Vue.filter('currency', currency) // (filterName, importName)
Vue.filter('date', date) // (filterName, importName)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
