<template>
  <row :style="indent" class="px-3 bg-neutral-100 hover:bg-neutral-200 cursor-pointer transition duration-75">
    <icon v-if="category.children.length > 0" :class="{'rotate-[270deg]' : isOpen && category.children.length > 0}" :name="icons.chevron" class="-mt-1 transform" size="18"></icon>
    <icon v-else :name="icons.chevron" class="transform text-neutral-200" size="18"></icon>
    <div class="pr-2 py-4 flex items-center" @click="isOpen = !isOpen">
      <span class="rounded-full " v-text="getNumber(category.id)"></span>
      <span class="mx-1"><icon :name="icons.left" size="14"></icon></span>
      <span v-text="category.name"></span>
    </div>
    <space @click="isOpen = !isOpen"/>
    <div class="flex">
      <btn @click="openPriceDialog(category)">
        <icon :name="icons.price" size="20"/>
      </btn>
      <btn @click="openAddingDialog(category)">
        <icon :name="icons.plus" size="20"/>
      </btn>
      <btn @click="openEditingDialog(category)">
        <icon :name="icons.edit" size="20"/>
      </btn>
      <btn @click="openDeletingDialog(category)">
        <icon :name="icons.delete" size="20"/>
      </btn>
    </div>
  </row>
  <Expand>
    <row v-if="category.children && category.children.length > 0" v-show="isOpen">
      <w v-for="(child) in category.children" :key="child.id">
        <category :category="child" :depth="depth + 1" @update="$emit('update')"/>
      </w>
    </row>
  </Expand>
  <xdialog v-model="categoryAddingDialogModel">
    <div class="rounded-xl bg-white overflow-hidden max-w-screen-xs w-full">
      <row class="px-3 py-4 special">
        <div>
          <span> ایجاد دسته بندی </span>
          <span v-if="model.category !== ''">زیرمجموعه برای {{ model.category }}</span>
        </div>
      </row>
      <div class="max-h-[80vh] overflow-y-scroll">
        <row class="p-4 w-full">
          <w>
            <xinput v-model="model.name" :prepend-icon="icons.category" name="نام"/>
          </w>
          <w class="mt-4">
            <xinput v-model="model.price" :name="'قیمت ' + getPrice(model.price) + ' تومان'" :prepend-icon="icons.money"/>
          </w>
          <w class="mt-4">
            <xinput v-model="model.chip" :append-icon="icons.plus" :prepend-icon="icons.filter" name="فیلتر ها" @append="addChip" @keydown.enter="addChip"/>
          </w>
          <w class="py-4">
            <row>
              <div v-for="(chip , index) in model.chips" :key="chip.name" class="rounded-full bg-neutral-200 mb-2 ml-3 flex pr-3 pl-1 mb-2">
                <span class="flex pt-1.5">{{ chip.name }}</span>
                <btn @click="removeChip(index)">
                  <icon :name="icons.chipClose" label="Delete" size="20"/>
                </btn>
              </div>
            </row>
          </w>
        </row>
      </div>
      <row class="pb-3 px-2">
        <btn @click="closeAddingDialog">
          بستن
        </btn>
        <btn @click="makeCategory">
          ذخیره
        </btn>
      </row>
    </div>
  </xdialog>
  <xdialog v-model="categoryEditingDialogModel">
    <div class="rounded-xl bg-white overflow-hidden max-w-screen-xs w-full">
      <row class="px-3 py-4 special">
        <div class="w-full">
          <span>ویرایش دسته بندی </span>
          <span v-text="model.category"></span>
        </div>
      </row>
      <div class="max-h-[80vh] overflow-y-scroll">
        <row class="p-4 w-full">
          <w>
            <div class="special rounded-xl py-4 min-h-[100px] p-4" @click="showUpload">
              <div ref="img" class="flex"></div>
            </div>
            <input ref="upload" class="transform h-0 w-0" type="file" @change="upload($event)">
          </w>
          <w class="mt-4">
            <xinput v-model="model.name" :prepend-icon="icons.category" name="نام"/>
          </w>
          <w class="mt-4">
            <xinput v-model="model.price" :name="model.price ? 'قیمت ' + getPrice(model.price) + ' تومان' : 'قیمت'" :prepend-icon="icons.money"/>
          </w>
          <w class="mt-4">
            <xinput v-model="model.parent" :prepend-icon="icons.parent" name="دسته بندی مادر"/>
          </w>
          <w class="mt-4">
            <xinput v-model="model.chip" :append-icon="icons.plus" :prepend-icon="icons.filter" name="فیلتر ها" @append="addChip" @keydown.enter="addChip"/>
          </w>
          <w class="py-4">
            <row>
              <div v-for="(chip , index) in model.chips" :key="chip.name" class="rounded-full bg-neutral-200 mb-2 ml-3 flex pr-3 pl-1 mb-2">
                <span class="flex pt-1.5">{{ chip.name }}</span>
                <btn label="Delete" @click="removeChip(index)">
                  <icon :name="icons.chipClose" size="20"/>
                </btn>
              </div>
            </row>
          </w>
        </row>
      </div>
      <row class="pb-3 px-2">
        <btn @click="closeEditingDialog">
          بستن
        </btn>
        <btn @click="editCategory">
          ذخیره
        </btn>
      </row>
    </div>
  </xdialog>
  <xdialog v-model="categoryDeletingDialogModel">
    <div class="rounded-xl bg-white overflow-hidden max-w-screen-xs w-full">
      <row class="px-3 py-4 special">
        <div class="w-full">
          <span>حذف دسته بندی </span>
          <span class="mr-1" v-text="model.category"></span>
        </div>
      </row>
      <row class="py-3 px-2">
        <btn @click="closeDeletingDialog">
          بستن
        </btn>
        <btn @click="deleteCategory">
          حذف
        </btn>
      </row>
    </div>
  </xdialog>
  <xdialog v-model="categoryPriceDialogModel">
    <div class="rounded-xl bg-white overflow-hidden max-w-screen-xs w-full">
      <row class="px-3 py-4 special">
        <div class="w-full ">
          <span>تغییر قیمت دسته بندی </span>
          <span v-text="model.category"></span>
        </div>
      </row>
      <row class="p-3 ">
        <w class="mt-4">
          <xinput v-model="model.price" :prepend-icon="icons.price" name="قیمت"/>
        </w>
        <w class="mt-4">
          <xinput v-model="model.discount" :prepend-icon="icons.discount" name="تخفیف"/>
        </w>
      </row>
      <row class="py-3 px-2">
        <btn @click="closePriceDialog">
          بستن
        </btn>
        <btn @click="updatePrice">
          بروز کردن
        </btn>
      </row>
    </div>
  </xdialog>
</template>

<script>
import {
  mdiAlertCircle, mdiArrowLeft, mdiCardTextOutline, mdiDelete, mdiChevronLeft, mdiMenuDown, mdiMenuLeft,
  mdiOpenInNew, mdiPencil, mdiPlusBoxOutline, mdiShape, mdiChartTimelineVariantShimmer, mdiCloseCircle, mdiPercent, mdiCash
} from '@mdi/js'

import Expand from "@/transitions/expand";

export default {
  name: 'category',
  components: {Expand},
  props: {
    category: Object,
    depth: Number,
    last: Boolean
  },
  emits: ['update'],
  data() {
    return {
      photo: null,
      isOpen: false,
      loading: false,
      categories: [],
      increase: false,
      categoryPriceDialogModel: false,
      categoryAddingDialogModel: false,
      categoryEditingDialogModel: false,
      categoryDeletingDialogModel: false,
      model: {
        id: 0,
        chip: '',
        name: '',
        parent: 0,
        price: '0',
        percent: 0,
        discount: 0,
        category: '',
        chips: [{name: 'نوع طرح', values: []}, {name: 'رنگ طرح', values: []}, {name: 'رنگ زمینه', values: []}, {name: 'نوع کاربری', values: []}, {name: 'برند', values: []}]
      },
      icons: {
        plus: mdiPlusBoxOutline,
        openNew: mdiOpenInNew,
        delete: mdiDelete,
        open: mdiMenuDown,
        chevron: mdiChevronLeft,
        left: mdiArrowLeft,
        close: mdiMenuLeft,
        money: mdiCash,
        parent: mdiCash,
        chipClose: mdiCloseCircle,
        price: mdiChartTimelineVariantShimmer,
        edit: mdiPencil,
        category: mdiShape,
        discount: mdiPercent,
        alert: mdiAlertCircle,
        text: mdiCardTextOutline,
      }
    }
  },
  computed: {
    indent() {
      return {paddingRight: `${this.depth * 12}px`}
    }
  },
  methods: {
    openAddingDialog(item) {
      this.model.parent = item.id
      this.model.category = item.name
      this.categoryAddingDialogModel = true
    },
    closeAddingDialog() {
      this.model.id = 0
      this.model.name = ''
      this.model.category = ''
      this.model.description = ''
      this.categoryAddingDialogModel = false
      this.model.chips = [{name: 'برند', values: []}]
    },
    makeCategory() {
      this.axios.post('/xcategory', {
        name: this.model.name,
        description: this.model.description,
        parent_id: this.model.parent,
        filters: this.model.chips,
        price: this.model.price
      }).then(() => {
        this.loading = false
        this.model.name = ''
        this.$emit('update')
        this.model.price = ''
        this.closeAddingDialog()
        this.model.description = ''
        this.model.chips = [{name: 'نوع طرح', values: []}, {name: 'رنگ طرح', values: []}, {name: 'رنگ زمینه', values: []}, {name: 'نوع کاربری', values: []}, {name: 'برند', values: []}]
        this.$store.dispatch('alerts/update', {message: 'دسته بندی ' + this.model.name + ' با موفقیت ایجاد شد.', type: 'success'})
      }).catch(err => {
        this.loading = false
        if (err.response.status === 422)
          this.$store.dispatch('alerts/update', {message: err.response.data.errors[0].message, type: 'warning'})
      })
    },
    openEditingDialog(item) {
      this.model.id = item.id
      this.model.name = item.name
      this.model.price = item.price
      this.model.chips = item.filters
      this.model.category = item.name
      this.model.parent = item.parent_id
      this.categoryEditingDialogModel = true
      this.model.description = item.description
    },
    closeEditingDialog() {
      this.model.id = 0
      this.model.name = ''
      this.model.parent = 0
      this.model.price = '0'
      this.model.category = ''
      this.model.description = ''
      this.categoryEditingDialogModel = false
      this.model.chips = [{name: 'نوع طرح', values: []}, {name: 'رنگ طرح', values: []}, {name: 'رنگ زمینه', values: []}, {name: 'نوع کاربری', values: []}, {name: 'برند', values: []}]
    },
    editCategory() {
      this.axios.put('/xcategory/' + this.model.id, {
        name: this.model.name,
        parent_id: this.model.parent,
        filters: this.model.chips,
        price: this.model.price
      }).then(async () => {
        this.$emit('update')
        if (this.photo) {
          let form = new FormData();
          form.append('photo', this.photo)
          await this.axios.post('/xcategory/' + this.model.id + '/photo', form)
        }
        this.$store.dispatch('alerts/update', {message: 'دسته بندی ' + this.model.category + ' با موفقیت ویرایش شد.', type: 'success'})
        this.closeEditingDialog()
      }).catch(err => (err.response.status === 422) && this.$store.dispatch('alerts/update', {message: err.response.data.errors[0].message, type: 'warning'})
      )
    },
    openDeletingDialog(item) {
      this.model.id = item.id
      this.model.category = item.name
      this.categoryDeletingDialogModel = true
    },
    closeDeletingDialog() {
      this.model.id = 0
      this.model.category = ''
      this.categoryDeletingDialogModel = false
    },
    deleteCategory() {
      this.axios.delete('xcategory/' + this.model.id)
        .then(() => {
          this.$emit('update')
          this.closeDeletingDialog()
          this.$store.dispatch('alerts/update', {message: 'دسته بندی ' + this.model.category + ' با موفقیت حذف شد.', type: 'success'})
        }).catch(err => {
        if (err.response.status === 403) this.$store.dispatch('alerts/update', {message: err.response.data, type: 'warning'})
        else this.$store.dispatch('alerts/update', {message: "مشکلی پیش آمده است , لطفا بعدا تلاش کنید", type: 'warning'})
      })
    },
    openPriceDialog(item) {
      this.model.id = item.id
      this.model.category = item.name
      this.categoryPriceDialogModel = true
    },
    closePriceDialog() {
      this.model.id = 0
      this.model.category = ''
      this.categoryPriceDialogModel = false
    },
    updatePrice() {
      this.axios.put('/admin/category/' + this.model.id, {price: this.model.price, discount: this.model.discount})
        .then(() => {
          this.$store.dispatch('notifications/update', {data: ['تغییر قیمت با موفقیت انجام شد.'], type: 'success'})
          this.closePriceDialog()
        }).catch(() => {
        this.$store.dispatch('notifications/update', {data: ['تغییر قیمت به فاک رفت'], type: 'error'})
      })
    },
    removeChip(index) {
      if (this.model.chips.length < 2) return
      this.model.chips.splice(index, 1)
    },
    addChip() {
      if (this.model.chip.length < 2) return
      if (this.model.chips.some(el => el.name === this.chip)) {
        this.chip = ''
        this.$store.dispatch('notifications/update', {data: ['این فیلتر قبلا اضافه شده است.'], type: 'error'})
        return
      }
      this.model.chips.push({name: this.model.chip, values: []})
      this.model.chip = ''
    },
    clearFiles() {
      this.photo = null;
      this.$refs.img.innerHTML = '';
    },
    showUpload() {
      this.$refs.upload.click()
    },
    upload(ev) {
      this.clearFiles();
      this.photo = ev.target.files[0];
      let fileReader = new FileReader()
      fileReader.onload = (evn) => {
        let image = new Image();
        image.title = evn.name;
        image.src = evn.target.result;
        this.$refs.img.appendChild(image);
      }
      fileReader.readAsDataURL(this.photo)
    }
  }
}
</script>
