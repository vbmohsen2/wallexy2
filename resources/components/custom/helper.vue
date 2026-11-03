<template>
  <container>
    <row class="-mx-2 mt-6">
      <w class="px-2 cursor-pointer" md="1/2">
        <xdialog v-model="dialog">
          <template #active="{active}">
            <div class="bg-gradient-to-l from-neutral-700 to-neutral-500 rounded-xl" @click="active">
              <row class="justify-center items-center pl-3 pr-6">
                <div>
                  <span class="text-white">راهنمای انتخاب کاغذ دیواری</span>
                </div>
                <space/>
                <div class="bg-gradient-to-t from-neutral-800 to-neutral-600 rounded-xl p-3 my-3">
                  <icon :name="icons.helper" class="text-white" size="36"/>
                </div>
              </row>
            </div>
          </template>
          <div class="bg-white max-w-screen-xs w-[360px] overflow-hidden shadow-x rounded-xl">
            <row class="px-1 shadow-lg special py-2">
              <span class="py-2 px-2 text-md">راهنمای انتخاب کاغذ دیواری</span>
              <space/>
              <btn icon="بستن منو" @click="dialog = false">
                <icon :name="icons.close"/>
              </btn>
            </row>
            <div class="p-4 pb-3">
              <expand>
                <div v-if="step === 1">
                  <expand>
                    <div v-if="!show">
                      <span>آیا به دنبال آلبوم خاصی هستید ؟</span>
                      <row class="mt-2 -mx-3">
                        <btn @click="show = true">بله</btn>
                        <btn @click="step = 2">خیر</btn>
                      </row>
                    </div>
                  </expand>
                  <expand>
                    <div v-if="show">
                      <span>لطفا نام آلبوم خود را انتخاب کنید</span>
                      <input :value="model" @input="model = $event.target.value" class="input my-3" placeholder="جستجوی آلبوم" type="text">
                      <w :style="{height : filtered.length * 36 + 'px'}" class="max-scroll scrollbar transition-all">
                        <row v-for="album in filtered" :key="album.id" class="w-full hover:bg-neutral-100 rounded-xl py-2 px-1 cursor-pointer" @click="category(album)">
                          <div>
                            <span v-text="album.name"/>
                          </div>
                        </row>
                      </w>
                    </div>
                  </expand>
                </div>
              </expand>
              <expand>
                <div v-if="step === 2">
                  <row>
                    <w class="pb-3 pt-1 px-3">
                      <span class="text-md" v-text="'لطفا ' + filters[0].name + ' را انتخاب کنید'"/>
                    </w>
                    <w class="max-scroll scrollbar">
                      <row v-for="value in filters[0].values" :key="value.id" class="w-full hover:bg-neutral-100 rounded-xl ">
                        <checkbox v-model="value.model" :label="value.name" class="py-2.5 px-4 text-sm" @click.self="select(filters[0], value)"/>
                      </row>
                    </w>
                  </row>
                  <row class="mt-2">
                    <btn @click="step = 1">قبلی</btn>
                    <space/>
                    <btn @click="step = 3">بعدی</btn>
                  </row>
                </div>
              </expand>
              <expand>
                <div v-if="step === 3">
                  <row>
                    <w class="pb-3 pt-1 px-3">
                      <span class="text-md" v-text="'لطفا ' + filters[1].name + ' را انتخاب کنید'"/>
                    </w>
                    <w class="max-scroll scrollbar">
                      <row v-for="value in filters[1].values" :key="value.id" class="w-full hover:bg-neutral-100 rounded-xl ">
                        <checkbox v-model="value.model" :label="value.name" class="py-2.5 px-4 text-sm" @click.self="select(filters[1], value)"/>
                      </row>
                    </w>
                  </row>
                  <row class="mt-2">
                    <btn @click="step = 2">قبلی</btn>
                    <space/>
                    <btn @click="step = 4">بعدی</btn>
                  </row>
                </div>
              </expand>
              <expand>
                <div v-if="step === 4">
                  <row>
                    <w class="pb-3 pt-1 px-3">
                      <span class="text-md" v-text="'لطفا ' + filters[2].name + ' را انتخاب کنید'"/>
                    </w>
                    <w class="max-scroll scrollbar">
                      <row v-for="value in filters[2].values" :key="value.id" class="w-full hover:bg-neutral-100 ">
                        <checkbox v-model="value.model" :label="value.name" class="py-2.5 px-4 text-sm" @click.self="select(filters[2], value)"/>
                      </row>
                    </w>
                  </row>
                  <row class="mt-2">
                    <btn @click="step = 3">قبلی</btn>
                    <space/>
                    <btn @click="finish">اتمام</btn>
                  </row>
                </div>
              </expand>
              <div></div>
            </div>
          </div>
        </xdialog>
      </w>
      <w class="px-2 mt-4 md:mt-0" md="1/2">
        <inertia-link href="/price" title="لیست قیمت آلبوم های کاغذ دیواری">
          <div class="bg-gradient-to-l from-neutral-700 to-neutral-500 rounded-xl">
            <row class="justify-center items-center pl-3 pr-6">
              <div>
                <span class="text-white">لیست قیمت آلبوم های کاغذ دیواری</span>
              </div>
              <space/>
              <div class="bg-gradient-to-t from-neutral-800 to-neutral-600 rounded-xl p-3 my-3">
                <icon :name="icons.price" class="text-white" size="36"/>
              </div>
            </row>
          </div>
        </inertia-link>
      </w>
    </row>
  </container>
</template>

<script>
import {mdiClose, mdiImageSizeSelectActual, mdiStoreSearchOutline} from "@mdi/js";
import Expand from "@/transitions/expand";

export default {
  components: {Expand},
  data() {
    return {
      step: 1,
      model: '',
      album: '',
      albums: [],
      filters: [],
      show: false,
      dialog: false,
      selected: [],
      icons: {
        close: mdiClose,
        helper: mdiStoreSearchOutline,
        price: mdiImageSizeSelectActual,
      },
    }
  },
  computed: {
    filtered() {
      return this.albums.filter(album => album.name.includes(this.model))
    }
  },
  async mounted() {
    const response = await this.axios.get('/album').then(res => res.data)
    this.albums = response.albums
    this.filters = response.filters
  },
  methods: {
    select(key, value) {
      let code = key.name.replace(/\s/g, '-') + '_' + value.name.replace(/\s/g, '-')
      this.selected.includes(code) ? this.selected.splice(this.selected.indexOf(code), 1) : this.selected.push(code)
    },
    category(category) {
      this.step = 2
      this.album = category.name.replace(/\s/g, '-')
    },
    async finish() {
      if (!!this.album) {
        const count = await this.axios.get('/xcategory/' + this.album + '?filters=' + this.selected.join('.')).then(res => res.data.products.length)
        if (count < 1) this.$inertia.visit(  '/category/' + this.album)
        else this.$inertia.visit(  '/category/' + this.album + '?filters=' + this.selected.join('.'))
      } else {
        const count = await this.axios.get('/xcategory/کاغذ-دیواری?filters=' + this.selected.join('.')).then(res => res.data.products.length)
        if (count < 1) this.$inertia.visit('/category/کاغذ-دیواری')
        else this.$inertia.visit('/category/کاغذ-دیواری?filters=' + this.selected.join('.'))
      }
    }
  },
}
</script>
