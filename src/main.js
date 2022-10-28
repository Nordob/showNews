import Vue from 'vue'
import App from './App.vue'
import './assets/style/base.scss'
import store from './store/store.js'


Vue.config.productionTip = false

console.log(store)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
