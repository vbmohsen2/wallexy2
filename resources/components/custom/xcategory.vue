<template>
  <row :style="indent" class="px-4 cursor-pointer transition rounded-full duration-75 hover:bg-neutral-200">
    <div class="flex-grow flex" @click="navigate(category , category.children.length > 0)">
      <icon v-if="category.children.length > 0" :class="{'rotate-[-90deg]' : isOpen}" :name="icons.chevron" class="-mt-1 transition transform" size="14"/>
      <div class="pr-1 py-2 flex items-center">
        <span v-text="category.name"></span>
      </div>
      <space/>
    </div>
    <icon v-if="category.children.length > 0" :name="icons.new" class="-mt-1" size="16" @click="navigate(category , false)"></icon>
  </row>
  <Expand>
    <row v-if="category.children && category.children.length > 0" v-show="isOpen">
      <w v-for="(child) in category.children" :key="child.id">
        <xcategory :category="child" :depth="depth + 1" @close="$emit('close')"/>
      </w>
    </row>
  </Expand>
</template>

<script>
import {
  mdiAlertCircle,
  mdiArrowLeft,
  mdiCardTextOutline,
  mdiChevronLeft,
  mdiMenuDown,
  mdiMenuLeft,
  mdiPencil,
  mdiShape,
  mdiOpenInNew
} from '@mdi/js'

import Expand from "@/transitions/expand";

export default {
  emits: ['close'],
  components: {Expand},
  props: {
    category: Object,
    depth: Number,
  },
  data() {
    return {
      id: 0,
      isOpen: false,
      loading: false,
      icons: {
        open: mdiMenuDown,
        chevron: mdiChevronLeft,
        left: mdiArrowLeft,
        close: mdiMenuLeft,
        edit: mdiPencil,
        category: mdiShape,
        alert: mdiAlertCircle,
        text: mdiCardTextOutline,
        new: mdiOpenInNew,
      }
    }
  },
  computed: {
    indent() {
      return {paddingRight: `${this.depth * 12}px`}
    }
  },
  methods: {
    navigate(category, reverse) {
      if (reverse) return this.isOpen = !this.isOpen
      this.$emit('close')
      this.$inertia.visit('/category/' + category.name.replace(/\s/g, '-'))
    }
  }
}
</script>
