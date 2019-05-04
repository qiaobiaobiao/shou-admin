import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import AppBreadcrumb from '@/components/AppBreadcrumb'

Vue.use(ElementUI)
Vue.component('AppBreadcrumb', AppBreadcrumb)

Vue.config.productionTip = false

//123456789
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
