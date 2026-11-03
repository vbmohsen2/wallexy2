<template>
  <section class="relative h-slides">
    <div v-for="(photo, index) in slides">
      <transition name="carousel">
        <img v-show="index === target" :key="index" :alt="photo.link" :src="'https://static.wallexy.ir' + photo.path" :width="smartphone ? '600' : '800'" height="450">
      </transition>
    </div>
    <div class="absolute left-3 bottom-3 rounded-xl overflow-hidden">
      <button aria-label="previous" class="cursor-pointer bg-neutral-500 bg-opacity-50 text-white focus:outline-none w-10 md:w-12 h-10 md:h-12" @click="previous" @mouseup="stop">
        <icon :name="icons.previous"></icon>
      </button>
      <button aria-label="next" class="cursor-pointer bg-neutral-500 bg-opacity-50 text-white focus:outline-none w-10 md:w-12 h-10 md:h-12" @click="next" @mouseup="stop">
        <icon :name="icons.next"></icon>
      </button>
    </div>
    <div class="absolute right-3 bottom-3 flex">
      <div v-for="index in slides.length" :key="index" :class="index - 1 === target ? 'bg-neutral-50 border-neutral-500' : 'bg-neutral-500'"
           class="w-3 h-3 ml-3 rounded-full duration-1000 transition-all cursor-pointer border border-neutral-500"
           @click="select(index - 1)"
           @mouseup="stop">
      </div>
    </div>
  </section>
</template>
<script>
import {mdiChevronLeft, mdiChevronRight} from '@mdi/js';

export default {
  props: ['slides', 'smartphone'],
  data() {
    return {
      target: 1,
      length: 0,
      allow: true,
      slider: null,
      icons: {
        previous: mdiChevronRight,
        next: mdiChevronLeft
      }
    }
  },
  methods: {
    next() {
      if (!this.allow) return
      this.target = this.target + 1 === this.slides.length ? 0 : this.target + 1
      this.reset()
    },
    previous() {
      if (!this.allow) return
      this.target = this.target - 1 < 0 ? this.slides.length - 1 : this.target - 1
      this.reset()
    },
    select(target) {
      if (!this.allow) return
      this.target = target
      this.reset()
    },
    reset() {
      this.allow = false
      setTimeout(() => this.allow = true, 500)
    },
    stop() {
      clearInterval(this.slider)
    },
  },
  mounted() {
    this.previous()
    this.slider = setInterval(() => this.next(), 5000)
  },
}
</script>
