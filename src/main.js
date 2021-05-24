import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false
Vue.filter('correctNumber', function (number) {
  if (number) {
    return number.toString()
  }
});
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
