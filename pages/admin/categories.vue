<template>
  <Sidebar>
    <div>
      <row>
        <space/>
        <div class="-ml-2 -mt-1">
          <btn @click="dialog = true">
            <icon :name="icons.plus"/>
          </btn>
        </div>
      </row>
      <row class="mt-5 rounded-xl border-neutral-300 border overflow-hidden">
        <w v-for="category in categories" :key="category.id">
          <category :category="category" :depth="1" @update="update"/>
        </w>
      </row>
      <xdialog v-model="dialog">
        <div class="rounded-xl bg-white overflow-hidden max-w-screen-xs w-full">
          <row class="px-3 py-4 special">
            <div class="w-full">
              <span>ایجاد دسته بندی</span>
            </div>
          </row>
          <row class="p-4 w-full">
            <w>
              <xinput v-model="name" :prepend-icon="icons.category" name="نام"/>
            </w>
            <w class="mt-2">
              <xinput v-model="chip" :append-icon="icons.plus" :prepend-icon="icons.filter" name="فیلتر ها" @append="addChip" @keydown.enter="addChip"/>
            </w>
            <w class="py-4">
              <row>
                <div v-for="(chip , index) in chips" :key="chip.name" class="rounded-full bg-neutral-200 mb-2 ml-3 flex pr-3 pl-1 mb-2">
                  <span class="flex pt-1.5">{{ chip.name }}</span>
                  <btn label="Delete" @click="removeChip(index)">
                    <icon :name="icons.chipClose" size="20"/>
                  </btn>
                </div>
              </row>
            </w>
          </row>
          <row class="pb-3 px-2">
            <btn @click="dialog = false">
              بستن
            </btn>
            <btn @click="makeCategory">
              ذخیره
            </btn>
          </row>
        </div>
      </xdialog>
    </div>
  </Sidebar>
  <inertia-head>
    <title>دسته بندی ها</title>
  </inertia-head>
</template>
<script>
import {
  mdiAlertCircle,
  mdiAutoFix,
  mdiCardTextOutline,
  mdiChartTimelineVariantShimmer,
  mdiCloseCircle,
  mdiDelete,
  mdiFilter,
  mdiHomeExportOutline,
  mdiMenuDown,
  mdiMenuLeft,
  mdiOpenInNew,
  mdiPencil,
  mdiPlusBoxOutline,
  mdiShape
} from '@mdi/js'

import Sidebar from '@/components/side/admin'
import Category from '@/components/custom/category'

export default {
  components: {Sidebar, Category},
  data() {
    return {
      id: 0,
      name: '',
      chip: '',
      dialog: false,
      chips: [{name: 'نوع طرح', values: []}, {name: 'رنگ طرح', values: []}, {name: 'رنگ زمینه', values: []}, {name: 'نوع کاربری', values: []}, {name: 'برند', values: []}],
      categories: this.$page.props.categories,
      icons: {
        plus: mdiPlusBoxOutline,
        openNew: mdiOpenInNew,
        delete: mdiDelete,
        open: mdiMenuDown,
        close: mdiMenuLeft,
        edit: mdiPencil,
        chipClose: mdiCloseCircle,
        category: mdiShape,
        filter: mdiFilter,
        alert: mdiAlertCircle,
        text: mdiCardTextOutline,
        parent: mdiHomeExportOutline,
        price: mdiChartTimelineVariantShimmer,
        round: mdiAutoFix,
      }
    }
  },
  methods: {
    makeCategory() {
      this.axios
        .post('/xcategory', {name: this.name, parent_id: this.id, filters: this.chips})
        .then(async () => {
          this.name = ''
          this.chip = ''
          await this.update()
          this.description = ''
          this.chips = [{name: 'نوع طرح', values: []}, {name: 'رنگ طرح', values: []}, {name: 'رنگ زمینه', values: []}, {name: 'نوع کاربری', values: []}, {name: 'برند', values: []}]
          this.$store.dispatch('alerts/update', {message: 'دسته بندی ' + this.name + ' با موفقیت ایجاد شد.', type: 'success'})
          this.dialog = false
        }).catch(err => {
        if (err.response.status === 422)
          this.$store.dispatch('alerts/update', {message: err.response.data.errors[0].message, type: 'warning'})
      })
    },
    async update() {
      this.categories = await this.axios.get('/xcategory').then(res => res.data)
    },
    removeChip(index) {
      if (this.chips.length < 2) return
      this.chips.splice(index, 1)
    },
    addChip() {
      if (this.chip.length < 2) return
      if (this.chips.some(el => el.name === this.chip)) {
        this.chip = ''
        return this.$store.dispatch('alerts/update', {message: 'این فیلتر قبلا اضافه شده است.', type: 'error'})
      }
      this.chips.push({name: this.chip, values: []})
      this.chip = ''
    },
  }
}
</script>
