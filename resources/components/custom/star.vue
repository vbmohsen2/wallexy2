<template>
  <div class="flex cursor-pointer">
    <icon class="text-neutral-600" :name="memory > 0 ? icons.star : icons.starEmpty" size="20" @mouseleave="leave" @mouseover="hover(1)" @click="select(1)"/>
    <icon class="text-neutral-600" :name="memory > 1 ? icons.star : icons.starEmpty" size="20" @mouseleave="leave" @mouseover="hover(2)" @click="select(2)"/>
    <icon class="text-neutral-600" :name="memory > 2 ? icons.star : icons.starEmpty" size="20" @mouseleave="leave" @mouseover="hover(3)" @click="select(3)"/>
    <icon class="text-neutral-600" :name="memory > 3 ? icons.star : icons.starEmpty" size="20" @mouseleave="leave" @mouseover="hover(4)" @click="select(4)"/>
    <icon class="text-neutral-600" :name="memory > 4 ? icons.star : icons.starEmpty" size="20" @mouseleave="leave" @mouseover="hover(5)" @click="select(5)"/>
  </div>
</template>

<script>
import {mdiStar, mdiStarHalf, mdiStarOutline} from "@mdi/js";

export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  data() {
    return {
      memory: this.modelValue,
      icons: {
        starHalf: mdiStarHalf,
        starEmpty: mdiStarOutline,
        star: mdiStar,
      }
    }
  },

  methods: {
    hover(val) {
      this.memory = val
    },
    leave(){
      this.memory = this.modelValue
    },
    select(val){
      this.$emit('update:modelValue', val)
    }
  }
}
</script>

