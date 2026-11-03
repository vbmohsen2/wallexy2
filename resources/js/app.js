import '../css/app.css'
import axios from "./axios";
import loader from './loader'
import VueAxios from 'vue-axios'
import {createApp, h} from 'vue'
import NProgress from 'nprogress'
import store from '../../store/index'
import components from './components'
import VueCookies from 'vue3-cookies'
import layout from '../layout/default.vue'
import vClickOutside from "click-outside-vue3"
import { InertiaProgress } from '@inertiajs/progress'
import {createInertiaApp } from '@inertiajs/inertia-vue3'

createInertiaApp({
  title: title => title + ' | والکسی',
  resolve: async name => {
    const page = require(`../../pages/${name}`).default
    if (!page.layout) page.layout = layout
    return page
  },
  setup({el, App, props, plugin}) {
    const app = createApp({render: () => h(App, props)})
    app.config.globalProperties.getState = loader.getState
    app.config.globalProperties.getPrice = loader.getPrice
    app.config.globalProperties.getNumber = loader.getNumber
    app.config.globalProperties.getOrderPrice = loader.getOrderPrice
    store.axios = axios
    app.use(plugin)
    app.use(vClickOutside)
    app.use(store)
    app.use(VueCookies)
    app.use(VueAxios, axios)
    components.binder(app)
    app.mount(el)
  }
}).then(() => window.inertiaX = true)

InertiaProgress.init({
  delay: 100,
  includeCSS: false,
  showSpinner: true
})

window.progress = NProgress

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function () {
    console.log('%cWallexi SERVICE REGISTERED', 'background: #222; color: #bada55; font-size: 24px')
    console.log('%cDO NOT COPY ANYTHING HERE', 'background: #222; color: #e91e63; font-size: 24px')
  });
}
