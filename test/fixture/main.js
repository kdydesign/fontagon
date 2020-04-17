import Vue from 'vue'
import App from './App.vue'

import '../../dist/fontagon-icons.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
