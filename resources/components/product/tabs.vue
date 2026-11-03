<template>
  <div id="tabs" class="w-full mt-12">
    <row class="justify-center text-md">
      <div ref="tabs" class="flex">
        <div v-if="product.description" :class="tab === 1 ? 'border-neutral-700 transition-colors duration-500' : ''"
             class="pb-1 cursor-pointer px-3 border-b-2"
             @click="selectTab(1)">توضیحات
        </div>
        <div :class="tab === 2 ? 'border-neutral-700 transition-colors duration-500' : ''" class="pb-1  cursor-pointer px-3 border-b-2" @click="selectTab(2)">مشخصات</div>
        <div :class="tab === 3 ? 'border-neutral-700 transition-colors duration-500' : ''" class="pb-1  cursor-pointer px-3 border-b-2" @click="selectTab(3)">نظرات</div>
      </div>
    </row>
    <container>
      <div class="mt-8">
        <div ref="items" class="transition-height overflow-hidden -m-3 relative">
          <expand>
            <div v-if="product.description" v-show="tab === 1" class="p-4">
              <div class="post-class" v-html="product.description"></div>
            </div>
          </expand>
          <expand>
            <div v-show="tab === 2" class="p-4 pt-6">
              <row v-for="header in product.headers" :key="header.id" class="my-6">
                <w>
                  <h3 class="font-bold" v-text="header.name"></h3>
                </w>
                <w>
                  <row v-for="data in header.values" :key="data.id" class="mt-3 rounded-full overflow-hidden bg-neutral-200">
                    <w all="1/3" class="px-2 pr-3 py-2   border-l border-neutral-300" sm="1/4"><span v-text="data.key"></span></w>
                    <w all="2/3" class="px-2 py-2 " sm="3/4"><span v-text="data.value"></span></w>
                  </row>
                </w>
              </row>
            </div>
          </expand>
          <expand>
            <div v-show="tab === 3">
              <row class="shadow-lg bg-neutral-200 rounded-full p-1.5 mb-4">
                <div>
                  <xdialog v-model="commentDialog">
                    <template #active="{active}">
                      <aria v-if="authenticated" label="ثبت نظر" @click.native="active">
                        <div class="flex">
                          <icon :name="icons.comment" size="20"/>
                          <span class="pr-2">ثبت نظر</span></div>
                      </aria>
                      <aria v-else label="ثبت نظر" @click.native="alert()">
                        <div class="flex">
                          <icon :name="icons.comment" size="20"/>
                          <span class="pr-2">ثبت نظر</span></div>
                      </aria>
                    </template>
                    <div class="shadow-x bg-white rounded-xl max-w-screen-xs w-full">
                      <row class="p-4 w-full">
                        <w>
                          <xinput v-model="comment.title" :prepend-icon="icons.text" name="عنوان"/>
                        </w>
                        <w class="mt-4">
                          <xtext v-model="comment.text" :prepend-icon="icons.comment" name="متن"/>
                        </w>
                        <w class="mt-5 flex">
                          <span class="pr-1">امتیاز</span>
                          <star v-model="comment.rating" class="mr-1.5 mt-0.5"/>
                        </w>
                      </row>
                      <row class="py-3 pb-4 px-2">
                        <btn @click.native="commentDialog = false">
                          بستن
                        </btn>
                        <btn @click.native="makeComment()">
                          ثبت
                        </btn>
                      </row>
                    </div>
                  </xdialog>
                </div>
                <space/>
                <div class="flex">
                  <btn icon @click.native="sortOldComments">
                    <icon :name="icons.oldComment" class="pl-2" size="19"/>
                  </btn>
                  <btn icon @click.native="sortGoodComments">
                    <icon :name="icons.heartEmpty" class="pl-2" size="19"/>
                  </btn>
                  <btn icon @click.native="sortNewComments">
                    <icon :name="icons.newComment" size="19"/>
                  </btn>
                </div>
              </row>
              <row v-if="product.comments.length === 0" class="bg-neutral-200 rounded-full shadow-lg py-3 flex px-3 mb-2">
                <icon :name="icons.alert" class="pl-1" size="18"/>
                <span>تاکنون نظری ثبت نشده است</span>
              </row>
              <row>
                <w v-for="comment in product.comments" :key="comment.id" class="mb-4 relative bg-neutral-200 rounded-xl shadow-lg">
                  <div class="absolute left-0 top-11 p-1 flex-col flex">
                    <btn icon>
                      <div class="flex" @click="like(comment)">
                        <icon :name="icons.like" size="19"/>
                      </div>
                    </btn>
                    <btn icon>
                      <div class="flex" @click="dislike(comment)">
                        <icon :name="icons.dislike" size="19"/>
                      </div>
                    </btn>
                  </div>
                  <w class="pr-3">
                    <div class="w-full h-full">
                      <row>
                        <w class="py-3 border-b border-neutral-300">
                          <div class="flex">
                            <icon :name="icons.user" class="pl-2" size="19"/>
                            <h3 v-text="comment.extra.first_name + ' ' + comment.extra.last_name"></h3>
                            <icon v-if="comment.buyer" :name="icons.check" class="pl-2" size="19"/>
                            <space/>
                            <div class="flex">
                              <span class="pl-1" v-text="getHearts(comment.meta.likes_count , comment.meta.dislikes_count)"></span>
                              <icon :name="icons.heartEmpty" class="pl-3" size="19"></icon>
                              <span class="pl-1" v-text="new Date(comment.created_at).toLocaleDateString('fa')"></span>
                              <icon :name="icons.date" class="pl-2.5" size="19"></icon>
                            </div>
                          </div>
                        </w>
                        <w class="pt-3">
                          <div class="flex pl-10">
                            <icon :name="icons.title" class="pl-2" size="19"/>
                            <h3 v-text="comment.title"></h3>
                          </div>
                        </w>
                        <w class="py-3">
                          <div class="flex pl-10">
                            <icon :name="icons.text" class="pl-2" size="19"/>
                            <p v-text="comment.text"></p>
                          </div>
                        </w>
                        <w v-if="comment.answer" class="pb-3">
                          <div class="flex">
                            <icon :name="icons.answered" class="pl-2" size="19"/>
                            <h3 v-text="comment.answer"></h3>
                          </div>
                        </w>
                      </row>
                    </div>
                  </w>
                </w>
              </row>
            </div>
          </expand>
        </div>
      </div>
    </container>
  </div>
</template>
<script>
import {
  mdiPlus,
  mdiCloseOutline,
  mdiImage,
  mdiMinus,
  mdiStore,
  mdiPencil,
  mdiAlertCircleOutline,
  mdiHeartOutline,
  mdiCheckOutline,
  mdiAccountCircleOutline,
  mdiHandPointingUp,
  mdiHeartPlusOutline,
  mdiTableOfContents,
  mdiCardTextOutline,
  mdiChartLineVariant,
  mdiHandPointingDown,
  mdiHeartMinusOutline,
  mdiCalendarArrowLeft,
  mdiTextBoxPlus,
  mdiCalendarArrowRight,
  mdiAccountSupervisorCircle,
  mdiArrowUpBoldHexagonOutline, mdiCalendar, mdiTextShort,
  mdiArrowDownBoldHexagonOutline, mdiCommentMultipleOutline
} from '@mdi/js';

import Expand from "@/transitions/expand";

export default {
  props: ['product'],
  components: {Expand},
  data() {
    return {
      editor: false,
      show: false,
      chips: [],
      commentDialog: false,
      tab: this.product.description ? 1 : 2,
      releaseLike: true,
      comment: {
        text: '',
        rating: 5,
        title: ''
      },
      icons: {
        plus: mdiPlus,
        alert: mdiAlertCircleOutline,
        image: mdiImage,
        minus: mdiMinus,
        edit: mdiPencil,
        close: mdiCloseOutline,
        store: mdiStore,
        cash: mdiStore,
        check: mdiCheckOutline,
        user: mdiAccountCircleOutline,
        like: mdiHeartPlusOutline,
        text: mdiCardTextOutline,
        table: mdiTableOfContents,
        chart: mdiChartLineVariant,
        answered: mdiCommentMultipleOutline,
        title: mdiTextShort,
        pointUp: mdiHandPointingUp,
        heartEmpty: mdiHeartOutline,
        dislike: mdiHeartMinusOutline,
        comment: mdiTextBoxPlus,
        pointDown: mdiHandPointingDown,
        newComment: mdiCalendarArrowLeft,
        oldComment: mdiCalendarArrowRight,
        date: mdiCalendar,
        arrowUp: mdiArrowUpBoldHexagonOutline,
        supervisor: mdiAccountSupervisorCircle,
        arrowDown: mdiArrowDownBoldHexagonOutline
      }
    }
  },
  computed: {
    authenticated() {
      return this.$page.props.authenticated
    },
    administrator() {
      return this.authenticated && this.$page.props.user && this.$page.props.user.type > 0
    },
  },
  methods: {
    selectTab(item) {
      this.tab = item
    },
    sortOldComments() {
      this.product.comments.sort((a, b) => {
        let dateA = new Date(a.updated_at)
        let dateB = new Date(b.updated_at);
        return dateA - dateB;
      });
    },
    sortGoodComments() {
      this.product.comments.sort((a, b) => {
        return (b.meta.likes_count - b.meta.dislikes_count) - (a.meta.likes_count - a.meta.dislikes_count);
      });
    },
    sortNewComments() {
      this.product.comments.sort((a, b) => {
        let dateA = new Date(a.updated_at)
        let dateB = new Date(b.updated_at);
        return dateB - dateA;
      });
    },
    getHearts(likes, dislikes) {
      return (likes - dislikes < 0) ? this.getNumber('0') : this.getNumber(likes - dislikes)
    },
    makeComment() {
      this.axios.post('/xproduct/' + this.product.id + '/comment',
          {title: this.comment.title, text: this.comment.text, score: this.comment.rating})
          .then(res => {
            res.status === 200 && this.$store.dispatch('alerts/update', {message: 'نظر شما ثبت شد و پس از بررسی تایید خواهد شد.', type: 'success'})
            this.commentDialog = false
            this.comment.title = ''
            this.comment.text = ''
            this.comment.rating = 5
          })
          .catch(err => {
            if (err.response.status === 422)
              this.$store.dispatch('alerts/update', {message: err.response.data.errors[0].message, type: 'error'})
            else if (err.response.status === 403)
              this.$store.dispatch('alerts/update', {message: 'کامنت شما قبلا ثبت شده است.', type: 'error'})
            else if (err.response.status === 400)
              this.$store.dispatch('alerts/update', {message: 'لطفا برای ثبت نظر, ثبت نام خود را تکمیل کنید.', type: 'error'})
            else this.$store.dispatch('alerts/update', {message: 'مشکلی پیش آمده است , ما در حال رفع مشکل هستیم , لطفا صبور باشید .', type: 'error'})
          })
    },
    alert() {
      this.$store.dispatch('alerts/update', {message: 'لطفا ابتدا وارد حساب کاربری خود شوید', type: 'error'})
    },
    like(comment) {
      if (!this.releaseLike)
        return;
      this.releaseLike = false;
      if (comment.user_id === this.id) {
        this.releaseLike = true;
        return this.$store.dispatch('alerts/update', {message: 'شما نمی توانید کامنت خود را بپسندید.', type: 'error'});
      }
      this.axios.post('/xproduct/comment/' + comment.id + '/like', {type: 'like'})
          .then(res => {
            if (res.data.type === 1) {
              --comment.meta.likes_count;
            } else if (res.data.type === 2) {
              --comment.meta.dislikes_count;
              ++comment.meta.likes_count;
            } else {
              ++comment.meta.likes_count;
            }
            setTimeout(() => this.releaseLike = true, 1000);
          })
          .catch(err => {
            if (err.response.data === 401)
              this.$store.dispatch('alerts/update', {message: 'لطفا وارد شود.', type: 'error'})
            else
              this.$store.dispatch('alerts/update', {message: 'مشکلی پیش آمده است , ما در حال رفع مشکل هستیم , لطفا صبور باشید .', type: 'error'})
            setTimeout(() => this.releaseLike = true, 1000);
          })
    },
    dislike(comment) {
      if (!this.releaseLike)
        return;
      this.releaseLike = false;
      if (comment.user_id === this.id) {
        this.releaseLike = true;
        return this.$store.dispatch('alerts/update', {message: 'شما نمی توانید کامنت خود را نپسندید. :)', type: 'error'});
      }
      this.axios.post('/xproduct/comment/' + comment.id + '/like', {type: 'dislike'})
          .then(res => {
            if (res.data.type === 1) {
              --comment.meta.dislikes_count;
            } else if (res.data.type === 2) {
              --comment.meta.likes_count;
              ++comment.meta.dislikes_count;
            } else {
              ++comment.meta.dislikes_count;
            }
            setTimeout(() => this.releaseLike = true, 1000);
          })
          .catch(err => {
            if (err.response.data === 401)
              this.$store.dispatch('alerts/update', {message: 'لطفا وارد شود.', type: 'error'})
            else
              this.$store.dispatch('alerts/update', {message: 'مشکلی پیش آمده است , ما در حال رفع مشکل هستیم , لطفا صبور باشید .', type: 'error'})
            setTimeout(() => this.releaseLike = true, 1000);
          })
    },
    addScripts() {
      if (document.getElementById('ckeditor')) return;
      let editor = document.createElement('SCRIPT');
      editor.src = '/extra/ckeditor.js'
      editor.id = 'ckeditor'
      document.body.appendChild(editor)
    }
  },

  mounted() {
    this.administrator && !this.editor && this.addScripts()
  },
}
</script>
