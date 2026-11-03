import Vue from 'vue';

import w from '../components/layout/w.vue'
import row from '../components/layout/row.vue'
import {Head, Link} from "@inertiajs/vue3";
import space from '../components/layout/space.vue'
import icon from '../components/custom/icon.vue'
import xswitch from '../components/custom/switch.vue'
import input from '../components/custom/input.vue'
import text from '../components/custom/text.vue'
import star from '../components/custom/star.vue'
import card from '../components/custom/card.vue'
import btn from '../components/custom/btn.vue'
import aria from '../components/custom/aria.vue'
import xmenu from '../components/custom/xmenu.vue'
import xsheet from '../components/custom/xsheet.vue'
import xdialog from '../components/custom/xdialog.vue'
import client from '../components/custom/client.vue'
import slider from '../components/custom/slider.vue'
import container from '../components/layout/container.vue'

Vue.component('w', w)
Vue.component('row', row)
Vue.component('btn', btn)
Vue.component('card', card)
Vue.component('aria', aria)
Vue.component('star', star)
Vue.component('icon', icon)
Vue.component('xtext', text)
Vue.component('xmenu', xmenu)
Vue.component('space', space)
Vue.component('xinput', input)
Vue.component('slider', slider)
Vue.component('expand', expand)
Vue.component('client', client)
Vue.component('xsheet', xsheet)
Vue.component('xdialog', xdialog)
Vue.component('xswitch', xswitch)
Vue.component('container', container)
app.component('inertia-link', Link)
app.component('inertia-head', Head)

Vue.directive('click-outside', {
  inserted: function (el) {
    el.focus()
  }
})

Vue.prototype.getPrice = n => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  if (n === null || n === undefined) return 'Not Found'
  return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").replace(/\d/g, x => persianDigits[x]);
}

Vue.prototype.getNumber = n => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  if (n === null || n === undefined) return 'Not Found'
  return n.toString().replace(/\d/g, x => persianDigits[x]);
}

