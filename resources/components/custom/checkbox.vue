<template>
  <label class="caption">
    {{ label }}
    <input :checked="Array.isArray(modelValue) ? modelValue.includes(value) : modelValue" class="checkbox" type="checkbox" @change="onChange(modelValue)">
    <span ref="checkmark" :class="{'bg-neutral-900' : Array.isArray(modelValue) ? modelValue.includes(modelValue) : modelValue}" class="checkmark border border-neutral-700 pointer-events-none"></span>
  </label>
</template>
<script>
export default {
  props: ['modelValue', 'label'],
  emits: ['update:modelValue'],
  data() {
    return {
      values: this.modelValue,
    }
  },
  methods: {
    onChange() {
      if (!Array.isArray(this.modelValue)) this.$emit('update:modelValue', !this.modelValue)
      else {
        if (this.values.includes(this.value)) this.values.splice(this.values.indexOf(this.value), 1)
        else this.values.push(this.value)
        this.$emit('update:modelValue', this.values)
      }
    }
  },
}
</script>


