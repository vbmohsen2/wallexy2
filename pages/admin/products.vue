<template>
  <sidebar>
    <div class="mt-4 relative">
      <row class="relative">
        <w>
          <label>
            <span class="block">کد محصول</span>
            <input v-model="code" class="input mt-3" type="text" @keypress.enter="addCode">
          </label>
          <btn class="absolute left-0 top-9" icon @click="addCode">
            <icon :name="icons.plus"/>
          </btn>
        </w>
        <div class="absolute left-0 w-24">
          <xswitch v-model="available" :label="available ? 'موجود' : 'ناموجود'"/>
        </div>
      </row>
      <row class="mt-3">
        <div v-for="(code , index) in codes" :key="index" class="rounded-full bg-neutral-200 ml-3 flex pr-3 pl-1 mb-2">
          <span class="flex pt-1.5" v-text="code"></span>
          <btn icon @click="removeCode(index)">
            <icon :name="icons.close" size="20"/>
          </btn>
        </div>
      </row>
      <row class="mt-4">
        <btn class="border rounded-xl border-neutral-700" @click="updateCodes">
          <span>بروز کردن محصولات</span>
        </btn>
      </row>
    </div>
    <div class="mt-4 relative">
      <row>
        <w>
          <xmenu v-model="categoryMenu" close-on-click full>
            <template #active="{active}">
              <div class="w-full cursor-pointer border border-neutral-200 h-full rounded-sm py-3 special relative" @click="active">
                <span class="pr-3 block text-sm" v-text="selected"></span>
                <icon :class="{'rotate-180' : categoryMenu}" :name="icons.menu" class="absolute left-3 top-3 transition transform" size="20"></icon>
              </div>
            </template>
            <div class="bg-white shadow-x transform -translate-y-1">
              <div v-for="category in categories" class="cursor-pointer">
                <div class="px-3 py-2 bg-neutral-100" v-text="category.name"></div>
                <div v-for="child in category.children" class="py-3 px-6 cursor-pointer hover:bg-neutral-200" @click="change(child)" v-text="child.name"></div>
              </div>
            </div>
          </xmenu>
        </w>
        <w class="mt-4">
          <row>
            <div v-for="stock in products" :key="stock" class="bg-neutral-200 p-2 m-2">
              <span v-text="stock"></span>
            </div>
          </row>
        </w>
      </row>
    </div>
  </sidebar>
  <inertia-head>
    <title>محصولات</title>
  </inertia-head>
</template>
<script>
import {mdiChevronDown, mdiCloseCircle, mdiPlusBoxOutline} from '@mdi/js';
import Sidebar from '@/components/side/admin'

export default {
  components: {Sidebar},
  data() {
    return {
      categoryMenu: false,
      available: false,
      selected: 'انتخاب دسته بندی',
      code: '',
      codes: [],
      products: [],
      categories: this.$page.props.categories,
      icons: {
        plus: mdiPlusBoxOutline,
        close: mdiCloseCircle,
        menu: mdiChevronDown
      }
    }
  },
  methods: {
    async change(child) {
      this.selected = child.name
      this.products = await this.axios.get('/admin/inventory/' + child.id).then((res) => res.data)
    },
    updateCodes() {
      this.axios.post('/admin/product', {codes: this.codes, type: this.available ? 'available' : 'unavailable'})
          .then(() => this.$store.dispatch('alerts/update', {message: this.available ? 'محصولات موجود شدند' : 'محصولات ناموجود شدند', type: 'success'}))
          .catch(() => this.$store.dispatch('alerts/update', {message: 'مشکلی پیش آمده است , ما در حال رفع مشکل هستیم , لطفا صبور باشید .', type: 'error'}))
    },
    addCode() {
      this.codes.push(this.code)
      this.code = ''
    },
    removeCode(index) {
      this.codes.splice(index, 1);
    },
  }
}
</script>
