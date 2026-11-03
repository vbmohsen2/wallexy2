<template>
  <div class="w-full relative">
    <div v-if="prependIcon" class="input-icons right-3" @click="$emit('prepend')">
      <icon :name="prependIcon" size="20"/>
    </div>
    <label :for="id" class="input-label" v-text="name"></label>
    <input v-bind="$attrs" :id="id" :class="[{'!pr-10' : prependIcon , '!pl-10' : appendIcon}, rule ? 'border-neutral-600' : 'border-neutral-200']" :value="modelValue" class="input"
           :type="type" @input="$emit('update:modelValue' , $event.target.value)"/>
    <div v-if="appendIcon" class="input-icons left-3" @click="$emit('append')">
      <icon :name="appendIcon" size="20"/>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    modelValue: String | Number,
    name: String,
    rule: {
      type: Boolean,
      default: false
    },
    prependIcon: {
      type: String,
    },
    appendIcon: {
      type: String,
    },
    type: {
      type: String,
      default: "text"
    },
  },
  computed: {
    id() {
      return 'id-' + (Math.random() * Date.now()).toString().substring(0, 8)
    },
  }
}
</script>

