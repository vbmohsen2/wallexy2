<template>
  <section class="relative">
    <row class="special-x mb-6">
      <container>
        <row>
          <span class="py-4" v-text="name"></span>
          <space></space>
          <button aria-label="prev" :disabled="page === 1" class="ctive:scale-90 px-2.5 transition hidden md:block focus:outline-none"
                  @click="prev">
            <icon :class="page === 1 ? 'text-neutral-200' : 'text-neutral-400'" :name="icons.right"></icon>
          </button>
          <button  aria-label="next" :disabled="max === page" class="active:scale-90 px-2.5 transition hidden md:block focus:outline-none" @click="next">
            <icon :class="page === max ? 'text-neutral-200' : 'text-neutral-400'" :name="icons.left"></icon>
          </button>
        </row>
      </container>
    </row>
    <div class="container mx-auto relative px-1.5">
      <div class="overflow-x-auto md:overflow-x-hidden w-full pb-2">
        <div ref="row" class="flex transform transition duration-500">
          <slot/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {mdiChevronLeftCircle, mdiChevronRightCircle} from '@mdi/js'

export default {
  props: ['name'],
  data() {
    return {
      page: 1,
      max: 0,
      inner: 0,
      scroll: 0,
      xAmount: 0,
      icons: {
        left: mdiChevronLeftCircle,
        right: mdiChevronRightCircle
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.inner = this.$refs.row.clientWidth
      this.scroll = this.$refs.row.scrollWidth
    }, 1)
    setTimeout(() => {
      this.scroll = this.$refs.row.scrollWidth
      this.max = Math.ceil(this.scroll / this.inner)
    }, 50)
  },
  methods: {
    next() {
      if (this.page < this.max) {
        this.move = this.inner * this.page
        if (this.scroll > this.move + this.inner) {
          this.$refs.row.style.transform = 'translateX(' + this.move + 'px)'
        } else {
          this.move = this.scroll - this.inner
          this.$refs.row.style.transform = 'translateX(' + this.move + 'px)'
        }
        this.page = ++this.page
      }
    },
    prev() {
      if (this.page > 1) {
        if (this.move < this.inner) {
          this.page = 1
          this.$refs.row.style.transform = 'translateX(' + (this.move = 0) + 'px)'
        } else {
          this.$refs.row.style.transform = 'translateX(' + (this.move -= this.inner) + 'px)'
          this.page = --this.page
        }
      }
    }
  }
}
</script>
