<template>
  <sidebar>
    <div v-if="paginate.length < 1" class=" a-3">
      <div class="mb-0 py-6 body-2 text-center flex justify-center">
        <icon :name="icons.alert" class="mx-1" size="18"/>
        <span>   نظری برای نمایش وجود ندارد.</span>
      </div>
    </div>
    <div v-else id="comments" class="-my-4">
      <row v-for="comment in paginate" :key="comment.id" class="rounded-xl overflow-hidden relative my-4">
        <div class="absolute left-0 top-2 p-1 flex-col flex">
          <btn icon @click="showApprove(comment)">
            <icon :name="icons.check" size="18"/>
          </btn>
          <btn icon @click="showDisapprove(comment)">
            <icon :name="icons.delete" size="18"/>
          </btn>
          <btn icon @click="showAnswer(comment)">
            <icon :name="icons.answer" size="18"/>
          </btn>
        </div>
        <w class="justify-center rounded-xl flex" lg="1/5" md="1/4" xl="1/6">
          <div class="w-full">
            <inertia-link :title="comment.product.name" :href="'/product/' + comment.product.id + '/' + comment.product.name.toString().replace(/\s/g  , '-')">
              <img :alt="comment.product.name" :src="comment.product.photo.normal" class="w-full">
            </inertia-link>
          </div>
        </w>
        <w class="pr-3 md:pt-0 bg-neutral-200 shadow-lg" lg="4/5" md="3/4" xl="5/6">
          <inertia-link :title="comment.product.name" :href="'/product/' + comment.product.id + '/' + comment.product.name.toString().replace(/\s/g  , '-')">
            <div class="w-full  h-full">
              <row>
                <w class="pt-3">
                  <div class="flex">
                    <icon :name="icons.user" class="pl-2" size="16"/>
                    <h3 v-text="comment.user.first_name + ' ' + comment.user.last_name +  ' - ' + getNumber(comment.user.number)"></h3>
                  </div>
                </w>
                <w class="pt-3">
                  <div class="flex">
                    <icon :name="icons.product" class="pl-2" size="16"/>
                    <h3 v-text="comment.product.name"></h3>
                  </div>
                </w>
                <w class="pt-3">
                  <div class="flex">
                    <icon :name="icons.title" class="pl-2" size="16"/>
                    <h3 class="pl-2" v-text="comment.title"></h3>
                    <icon v-for="i in comment.score" :key="i" :name="icons.star" class="mt-1" size="12"/>
                  </div>
                </w>
                <w class="py-3">
                  <div class="flex">
                    <icon :name="icons.text" class="pl-2" size="16"/>
                    <h3 v-text="comment.text"></h3>
                  </div>
                </w>
                <w v-if="comment.answer" class="pb-3">
                  <div class="flex">
                    <icon :name="icons.answered" class="pl-2" size="16"/>
                    <h3 v-text="comment.answer"></h3>
                  </div>
                </w>
              </row>
            </div>
          </inertia-link>
        </w>
      </row>
    </div>
    <xdialog v-model="approveDialog">
      <div class="w-64 p-3 bg-white">
        <row class="p-3 text-md"> آیا مطمئن هستید ؟</row>
        <row>
          <div class="relative text-sm">
            <btn @click="approveDialog = false">
              کنسل
            </btn>
            <btn @click="approveComment(comment)">
              تایید
            </btn>
          </div>
          <space/>
        </row>
      </div>
    </xdialog>
    <xdialog v-model="disapproveDialog">
      <div class="w-64 p-3 bg-white">
        <row class="p-3 text-md"> آیا مطمئن هستید ؟</row>
        <row>
          <div class="relative text-sm">
            <btn @click="disapproveDialog = false">
              کنسل
            </btn>
            <btn @click="disapproveComment(comment)">
              تایید
            </btn>
          </div>
          <space/>
        </row>
      </div>
    </xdialog>
    <xdialog v-model="answerDialog">
      <div class="max-w-screen-xs w-full p-3 bg-white">
        <row class="pt-1 pb-2"><h3>پاسخ به نظر</h3></row>
        <row>
          <xtext v-model="answer"></xtext>
        </row>
        <row class="mt-2">
          <div class="relative text-sm">
            <btn @click="answerDialog = false">
              کنسل
            </btn>
            <btn @click="editComment()">
              تایید
            </btn>
          </div>
          <space/>
        </row>
      </div>
    </xdialog>
  </sidebar>
  <inertia-head>
    <title>انظرات</title>
  </inertia-head>
</template>
<script>
import {
  mdiStar,
  mdiCommentCheck,
  mdiThumbDownOutline,
  mdiThumbUpOutline,
  mdiCommentRemove,
  mdiCommentMultiple,
  mdiArrowLeft,
  mdiAccountCircleOutline,
  mdiArrowRight, mdiAlertCircleOutline,
  mdiCommentMultipleOutline, mdiCheckboxMultipleBlankOutline, mdiTextShort, mdiCommentTextOutline

} from '@mdi/js';
import Sidebar from '@/components/side/admin'

export default {
  components: {Sidebar},
  data() {
    return {
      answer: '',
      approveDialog: false,
      disapproveDialog: false,
      answerDialog: false,
      page: 1,
      icons: {
        star: mdiStar,
        product: mdiCheckboxMultipleBlankOutline,
        user: mdiAccountCircleOutline,
        text: mdiCommentTextOutline,
        title: mdiTextShort,
        check: mdiCommentCheck,
        like: mdiThumbUpOutline,
        dislike: mdiThumbDownOutline,
        delete: mdiCommentRemove,
        answer: mdiCommentMultiple,
        answered: mdiCommentMultipleOutline,
        left: mdiArrowLeft,
        right: mdiArrowRight,
        alert: mdiAlertCircleOutline,
      },
      comments: this.$page.props.comments
    }
  },
  computed: {
    paginate() {
      return this.comments.slice((this.page - 1) * 12, this.page * 12)
    },
    commentsLength() {
      return Math.ceil(this.comments.length / 12)
    }
  },
  methods: {
    showAnswer(comment) {
      this.comment = comment;
      this.answerDialog = true
      this.answer = comment.answer;
    },
    showApprove(comment) {
      this.comment = comment;
      this.approveDialog = true
      this.answer = comment.answer;
    },
    showDisapprove(comment) {
      this.comment = comment;
      this.answer = comment.answer;
      this.disapproveDialog = true
    },
    approveComment() {
      this.axios.put('/admin/comment/' + this.comment.id, {state: 2})
        .then(async res => {
          this.approveDialog = false
          this.$inertia.visit(window.location.pathname)
          res.status === 200 && this.$store.dispatch('alerts/update', {message: 'نظر ویرایش شد ', type: 'success'})
        }).catch(() => this.$store.dispatch('alerts/update', {message: 'مشکلی پیش آمده است , ما در حال رفع مشکل هستیم , لطفا صبور باشید .', type: 'error'})
      )
    },
    disapproveComment() {
      this.axios.put('/admin/comment/' + this.comment.id, {state: 1})
        .then(async res => {
          this.disapproveDialog = false
          this.$inertia.visit(window.location.pathname)
          res.status === 200 && this.$store.dispatch('alerts/update', {message: 'نظر ویرایش شد ', type: 'success'})
        }).catch(() => this.$store.dispatch('alerts/update', {message: 'مشکلی پیش آمده است , ما در حال رفع مشکل هستیم , لطفا صبور باشید .', type: '()or'})
      )
    },
    editComment() {
      this.axios.put('/admin/comment/' + this.comment.id + '/answer',
        {answer: this.answer})
        .then(async res => {
          this.answerDialog = false;
          this.$inertia.visit(window.location.pathname)
          res.status === 200 && this.$store.dispatch('alerts/update', {message: 'به نظر پاسخ داده شد', type: 'success'})
        }).catch(() => this.$store.dispatch('alerts/update', {message: 'مشکلی پیش آمده است , ما در حال رفع مشکل هستیم , لطفا صبور باشید .', type: 'error'}))
    },
    updatePage(page) {
      this.page = page;
    },
  }
}
</script>
