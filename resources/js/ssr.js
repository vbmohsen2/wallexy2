import loader from "./loader";
import {createSSRApp, h} from 'vue';
import store from '../../store/index'
import components from "./components";
import layout from "../layout/default.vue";
import vClickOutside from "click-outside-vue3"
import {renderToString} from '@vue/server-renderer';
import {createInertiaApp} from '@inertiajs/inertia-vue3';

export default function render(page) {
  return createInertiaApp({
    page,
    title: title => title + ' | والکسی',
    render: renderToString,
    resolve: name => {
      const page = require(`../../pages/${name}`).default
      if (!page.layout) page.layout = layout
      return page
    },
    setup({App, props, plugin}) {
      const app = createSSRApp({render: () => h(App, props)})
      app.config.globalProperties.getState = loader.getState
      app.config.globalProperties.getPrice = loader.getPrice
      app.config.globalProperties.getNumber = loader.getNumber
      app.config.globalProperties.getOrderPrice = loader.getOrderPrice
      app.use(plugin)
      app.use(store)
      app.use(vClickOutside)
      components.binder(app)
      return app
    }
  })
}
