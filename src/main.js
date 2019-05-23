import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VCalendar from 'v-calendar'

Vue.config.productionTip = false

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
