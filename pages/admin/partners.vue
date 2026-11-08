<template>
  <sidebar>
    <card class="p-3 mb-4">
      <row class="items-center gap-2 flex-wrap">
        <button v-for="tab in tabs" :key="tab.value" type="button"
                :class="filter === tab.value ? 'bg-neutral-800 text-white' : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'"
                class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                @click="filter = tab.value">
          {{ tab.label }}
          <span class="mr-1 opacity-70">({{ count(tab.value) }})</span>
        </button>
        <space/>
        <span class="text-xs text-neutral-500">مجموع درخواست‌ها: {{ partners.length }}</span>
      </row>
    </card>

    <card v-if="filtered.length < 1" class="p-6">
      <div class="py-6 text-center text-neutral-500 text-sm">
        درخواستی برای نمایش وجود ندارد.
      </div>
    </card>

    <div v-for="partner in filtered" :key="partner.id"
         class="bg-white rounded-xl border border-neutral-200 shadow-sm mb-4 overflow-hidden">
      <row class="px-4 py-3 bg-neutral-100 items-center flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <icon :name="icons.user" size="18"/>
          <span class="font-bold text-sm" v-text="partner.full_name"></span>
        </div>
        <span class="text-xs text-neutral-500" v-text="partner.store_name"></span>
        <space/>
        <span :class="statusClass(partner.status)" class="text-[11px] font-bold px-2.5 py-1 rounded-full">
          {{ statusLabel(partner.status) }}
        </span>
      </row>

      <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-neutral-700">
        <div class="flex items-center gap-2">
          <icon :name="icons.phone" size="16"/>
          <a :href="'tel:' + partner.phone" class="ltr" dir="ltr" v-text="getNumber(partner.phone)"></a>
        </div>
        <div class="flex items-center gap-2">
          <icon :name="icons.city" size="16"/>
          <span v-text="partner.city"></span>
        </div>
        <div class="flex items-center gap-2">
          <icon :name="icons.store" size="16"/>
          <span v-text="partner.activity_type"></span>
        </div>
        <div class="flex items-center gap-2">
          <icon :name="icons.tier" size="16"/>
          <span>سطح پیشنهادی: <strong v-text="partner.tier"></strong></span>
        </div>
        <div class="flex items-center gap-2">
          <icon :name="icons.date" size="16"/>
          <span v-text="new Date(partner.created_at).toLocaleDateString('fa')"></span>
        </div>

        <div class="md:col-span-2 flex flex-wrap items-center gap-3 pt-2 border-t border-neutral-100">
          <a v-if="partner.cardFile" :href="partner.cardFile" target="_blank" rel="noopener"
             class="inline-flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-semibold">
            <icon :name="icons.file" size="16"/>
            <span>مشاهده کارت ویزیت</span>
          </a>
          <span v-else class="text-neutral-400">کارت ویزیت ارسال نشده</span>

          <a v-if="partner.storeFile" :href="partner.storeFile" target="_blank" rel="noopener"
             class="inline-flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-semibold">
            <icon :name="icons.file" size="16"/>
            <span>مشاهده تصویر فروشگاه</span>
          </a>
          <span v-else class="text-neutral-400">تصویر فروشگاه ارسال نشده</span>
        </div>
      </div>

      <div class="px-4 pb-4 space-y-2">
        <textarea v-model="partner.note" rows="2" placeholder="یادداشت داخلی کارشناس..."
                  class="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-neutral-400"></textarea>
        <row class="items-center flex-wrap gap-2">
          <button type="button" class="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-3 py-2 rounded-lg"
                  @click="updateStatus(partner, 'approved')">
            تایید درخواست
          </button>
          <button type="button" class="bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold px-3 py-2 rounded-lg"
                  @click="updateStatus(partner, 'rejected')">
            رد درخواست
          </button>
          <button type="button" class="bg-neutral-200 hover:bg-neutral-300 text-neutral-700 text-xs font-semibold px-3 py-2 rounded-lg"
                  @click="updateStatus(partner, 'pending')">
            بازگشت به در انتظار
          </button>
          <space/>
          <button type="button" class="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold px-3 py-2 rounded-lg"
                  @click="saveNote(partner)">
            ذخیره یادداشت
          </button>
          <button type="button" class="text-rose-600 hover:text-rose-700 text-xs font-semibold px-2 py-2"
                  @click="remove(partner)">
            حذف
          </button>
        </row>
      </div>
    </div>
  </sidebar>

  <inertia-head>
    <title>درخواست‌های همکاری</title>
  </inertia-head>
</template>

<script>
import {
  mdiAccountOutline,
  mdiCalendar,
  mdiCellphone,
  mdiFileDocumentOutline,
  mdiMapMarker,
  mdiStorefrontOutline,
  mdiTrophyOutline
} from '@mdi/js'
import Sidebar from '@/components/side/admin'

export default {
  components: {Sidebar},
  data() {
    return {
      filter: 'all',
      partners: this.$page.props.partners,
      tabs: [
        {label: 'همه', value: 'all'},
        {label: 'در انتظار', value: 'pending'},
        {label: 'تایید شده', value: 'approved'},
        {label: 'رد شده', value: 'rejected'}
      ],
      icons: {
        user: mdiAccountOutline,
        phone: mdiCellphone,
        city: mdiMapMarker,
        store: mdiStorefrontOutline,
        tier: mdiTrophyOutline,
        date: mdiCalendar,
        file: mdiFileDocumentOutline
      }
    }
  },
  computed: {
    filtered() {
      return this.filter === 'all'
        ? this.partners
        : this.partners.filter(partner => partner.status === this.filter)
    }
  },
  methods: {
    count(status) {
      return status === 'all'
        ? this.partners.length
        : this.partners.filter(partner => partner.status === status).length
    },
    statusLabel(status) {
      return {pending: 'در انتظار بررسی', approved: 'تایید شده', rejected: 'رد شده'}[status] || status
    },
    statusClass(status) {
      return {
        pending: 'bg-amber-100 text-amber-700',
        approved: 'bg-emerald-100 text-emerald-700',
        rejected: 'bg-rose-100 text-rose-700'
      }[status] || 'bg-neutral-200 text-neutral-700'
    },
    updateStatus(partner, status) {
      this.axios.put('/admin/partner/' + partner.id, {status})
        .then(res => {
          Object.assign(partner, res.data)
          this.$store.dispatch('alerts/update', {message: 'وضعیت درخواست به‌روزرسانی شد', type: 'success'})
        })
        .catch(() => this.$store.dispatch('alerts/update', {message: 'مشکلی پیش آمده است، دوباره تلاش کنید.', type: 'error'}))
    },
    saveNote(partner) {
      this.axios.put('/admin/partner/' + partner.id, {note: partner.note})
        .then(res => {
          Object.assign(partner, res.data)
          this.$store.dispatch('alerts/update', {message: 'یادداشت ذخیره شد', type: 'success'})
        })
        .catch(() => this.$store.dispatch('alerts/update', {message: 'مشکلی پیش آمده است، دوباره تلاش کنید.', type: 'error'}))
    },
    remove(partner) {
      if (!window.confirm('این درخواست و فایل‌های آن حذف شود؟')) return
      this.axios.delete('/admin/partner/' + partner.id)
        .then(() => {
          this.partners = this.partners.filter(item => item.id !== partner.id)
          this.$store.dispatch('alerts/update', {message: 'درخواست حذف شد', type: 'success'})
        })
        .catch(() => this.$store.dispatch('alerts/update', {message: 'مشکلی پیش آمده است، دوباره تلاش کنید.', type: 'error'}))
    }
  }
}
</script>
