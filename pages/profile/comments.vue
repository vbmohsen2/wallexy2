<template>
  <sidebar class="mt-4 mt-sm-0">
    <div v-if="paginate.length < 1" class="pa-3">
      <div class="mb-0 py-6 body-2 text-center flex justify-center">
        <icon :name="icons.alert" class="mx-1" size="18"/>
        <span>نظری برای نمایش وجود ندارد.</span>
      </div>
    </div>
    <div v-else>
      <row v-for="comment in paginate" id="comments" :key="comment.id" class="mb-4 relative rounded-xl overflow-hidden">
        <div class="absolute left-0 top-1 p-1 flex-col flex">
          <aria icon @click.native="showDialog(comment)">
            <icon :name="icons.edit" size="20"/>
          </aria>
          <btn icon="پاک کردن پیام" @click="select(comment)">
            <icon :name="icons.delete" size="18"/>
          </btn>
        </div>
        <w class="justify-center flex" lg="1/5" md="1/4" xl="1/6">
          <div class="w-full">
            <inertia-link :href="'/product/' + comment.product.id + '/' + comment.product.name.replace(/\s/g , '-')" :title="comment.product.name">
              <img :alt="comment.product.name" :src="comment.product.photo.normal" class="w-full">
            </inertia-link>
          </div>
        </w>
        <w class="pr-3 md:pt-0 shadow-lg bg-neutral-200" lg="4/5" md="3/4" xl="5/6">
          <inertia-link :href="'/product/' + comment.product.id + '/' + comment.product.name.replace(/\s/g , '-')" :title="comment.product.name">
            <div class="w-full  h-full">
              <row>
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
      <row v-if="commentsLength > 8" class="bg-neutral-200 shadow-lg py-2 justify-center">
        <btn icon="صفحه قبل" @click.native="page > 1 ? updatePage(--page) : updatePage(1)">
          <icon :name="icons.right" size="20"/>
        </btn>
        <span class="text-md pt-1.5 px-3" v-text="getNumber(page)"/>
        <btn icon="صفحه بعد" @click.native="page < commentsLength ? updatePage(++page) : updatePage(commentsLength)">
          <icon :name="icons.left" size="20"/>
        </btn>
      </row>
    </div>
  </sidebar>
  <xdialog v-model="editDialog">
    <div class="shadow-x bg-white max-w-screen-xs w-full">
      <row class="p-4 w-full">
        <w>
          <xinput v-model="dialog.title" :prepend-icon="icons.text" name="عنوان"/>
        </w>
        <w class="mt-4">
          <xtext v-model="dialog.text" :prepend-icon="icons.comment" name="متن"/>
        </w>
        <w class="mt-5 flex">
          <span class="pr-1">امتیاز</span>
          <star v-model="dialog.rating" class="mr-1.5 mt-0.5"/>
        </w>
      </row>
      <row class="py-3 pb-4 px-2">
        <btn @click.native="editDialog = false">
          بستن
        </btn>
        <btn @click.native="editComment(comment)">
          ویرایش
        </btn>
      </row>
    </div>
  </xdialog>
  <xdialog v-model="deleteDialog">
    <div class="w-64 p-3 bg-white">
      <row class="p-3 text-md"> آیا از حذف این نظر مطمئن هستید ؟</row>
      <row>
        <div class="relative text-sm">
          <btn @click.native="deleteDialog = false">
            کنسل
          </btn>
          <btn @click.native="deleteComment()">
            تایید
          </btn>
        </div>
        <space/>
      </row>
    </div>
  </xdialog>
  <inertia-head>
    <title>نظرات</title>
  </inertia-head>
</template>
<script>
import {
  mdiStar,
  mdiCommentEdit,
  mdiThumbUpOutline,
  mdiCommentRemove,
  mdiArrowLeft,
  mdiArrowRight, mdiAlertCircleOutline,
  mdiCommentMultipleOutline, mdiCheckboxMultipleBlankOutline, mdiCommentTextOutline, mdiTextShort

} from '@mdi/js';

import Sidebar from "@/components/side/profile";

export default {
  components: {Sidebar},
  data() {
    return {
      page: 1,
      answer: '',
      comment: null,
      editDialog: false,
      deleteDialog: false,
      comments: this.$page.props.comments,
      dialog: {
        text: '',
        rating: 5,
        title: ''
      },
      icons: {
        star: mdiStar,
        product: mdiCheckboxMultipleBlankOutline,
        text: mdiCommentTextOutline,
        title: mdiTextShort,
        like: mdiThumbUpOutline,
        delete: mdiCommentRemove,
        edit: mdiCommentEdit,
        answered: mdiCommentMultipleOutline,
        left: mdiArrowLeft,
        right: mdiArrowRight,
        alert: mdiAlertCircleOutline,
      }
    }
  },
  computed: {
    paginate() {
      return this.comments.slice((this.page - 1) * 8, this.page * 8)
    },
    favouritesLength() {
      return Math.ceil(this.comments.length / 8)
    }
  },
  methods: {
    select(comment) {
      this.comment = comment
      this.deleteDialog = true
    },
    showDialog(comment) {
      this.dialog.title = comment.title
      this.dialog.text = comment.text
      this.dialog.rating = comment.rating
      this.dialog.id = comment.id
      this.editDialog = true
    },
    deleteComment() {
      this.axios.delete('/profile/comments/' + this.comment.id)
        .then(async res => {
          res.status === 200 && this.$store.dispatch('alerts/update', {message: 'نظر شما حذف شد ', type: 'success'})
          this.$inertia.visit('/profile/comments')
        }).catch(() => {
        this.$store.dispatch('alerts/update', {message: 'مشکلی پیش آمده است , ما در حال رفع مشکل هستیم , لطفا صبور باشید .', type: 'error'})
      })
    },
    editComment() {
      this.axios.put('/profile/comments/' + this.dialog.id,
        {title: this.dialog.title, text: this.dialog.text, score: this.dialog.rating})
        .then(async res => {
          res.status === 200 && this.$store.dispatch('alerts/update', {message: 'نظر شما ویرایش شد ', type: 'success'})
          this.$inertia.visit('/profile/comments')
          this.editDialog = false;
        }).catch(() => {
        this.$store.dispatch('alerts/update', {message: 'مشکلی پیش آمده است , ما در حال رفع مشکل هستیم , لطفا صبور باشید .', type: 'error'})
      })
    },
    updatePage(page) {
      this.page = page;
      setTimeout(() => window.scrollTo({top: document.getElementById('comments').offsetTop - 50, behavior: 'smooth'}), 1)
    },
  }
}
</script>
