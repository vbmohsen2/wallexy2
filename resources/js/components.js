import w from "../components/layout/w"
import row from "../components/layout/row"
import btn from "../components/custom/btn"
import icon from "../components/custom/icon"
import text from "../components/custom/text"
import card from "../components/custom/card"
import aria from "../components/custom/aria"
import star from "../components/custom/star"
import xmenu from "../components/custom/xmenu"
import space from "../components/layout/space"
import input from "../components/custom/input"
import slider from "../components/custom/slider"
import client from "../components/custom/client"
import xsheet from "../components/custom/xsheet"
import xswitch from "../components/custom/switch"
import xdialog from "../components/custom/xdialog"
import xoption from "../components/custom/xoption"
import {Head, Link} from "@inertiajs/inertia-vue3"
import checkbox from "../components/custom/checkbox"
import container from "../components/layout/container"

export default {
  binder(app) {
    app.component('w', w)
    app.component('row', row)
    app.component('btn', btn)
    app.component('icon', icon)
    app.component('card', card)
    app.component('star', star)
    app.component('aria', aria)
    app.component('xtext', text)
    app.component('xmenu', xmenu)
    app.component('space', space)
    app.component('xinput', input)
    app.component('slider', slider)
    app.component('client', client)
    app.component('xsheet', xsheet)
    app.component('xswitch', xswitch)
    app.component('xdialog', xdialog)
    app.component('xoption', xoption)
    app.component('checkbox', checkbox)
    app.component('inertia-link', Link)
    app.component('inertia-head', Head)
    app.component('container', container)
    return app
  }

}
