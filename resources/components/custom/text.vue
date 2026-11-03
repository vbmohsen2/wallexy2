<template>
  <div :class="$attrs['class']" class="w-full relative">
    <div v-if="prependIcon" class="absolute right-2 top-10 text-neutral-500" @click="$emit('prepend')">
      <icon :name="prependIcon" size="20"/>
    </div>
    <label :for="id" class="flex relative pb-2" v-text="name"></label>
    <textarea :rows="$attrs['rows']" :id="id" :class="{'pr-10' : prependIcon}" :value="modelValue" class="special rounded-md w-full border border-neutral-200 focus:outline-none px-3 py-3 resize-none"
           type="text" @input="$emit('update:modelValue' , $event.target.value)"></textarea>
  </div>
</template>

<script>
export default {
  inheritAttrs : false,
  props: {
    modelValue: String | Number,
    value: String,
    name: String,
    prependIcon: {
      type: String,
    },
  },
  computed: {
    id() {
      return 'id-' + (Math.random() * Date.now()).toString().substring(0, 8)
    },
  }
}
</script>

