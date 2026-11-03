<template>
  <xmenu v-model="stateMenu" close-on-click full>
    <template #active="{active}">
      <div class="w-full cursor-pointer border border-neutral-200 h-full py-3 special rounded-sm relative" @click="active">
        <span class="pr-3 block" v-text="modelValue"></span>
        <icon :class="{'rotate-180' : stateMenu}" :name="icons.menu" class="absolute left-3 top-3 transition transform" size="20"></icon>
      </div>
    </template>
    <div class="bg-white shadow-x rounded-xl transform -translate-y-1">
      <ul>
        <li v-for="item in items" :key="item" class="option-item" @click="select(item)" v-text="item"></li>
      </ul>
    </div>
  </xmenu>
</template>
<script>
import {mdiChevronDown} from '@mdi/js';

export default {
  props: ['modelValue' , 'items'],
  emits: ['update:modelValue'],
  data() {
    return {
      stateMenu: false,
      icons: {
        menu: mdiChevronDown
      },
    }
  },
  methods: {
    select(target) {
      this.$emit('update:modelValue', target)
    }
  }
}
</script>
