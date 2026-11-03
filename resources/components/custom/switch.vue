<template>
  <label class="caption">
    {{ label }}
    <input :checked="modelValue" class="checkbox" type="checkbox" @change="$emit('update:modelValue' , $event.target.checked)">
    <span :class="modelValue ? 'bg-neutral-900' : 'bg-neutral-200'" class="switch"></span>
  </label>
</template>
<script>
export default {
  props: ['modelValue', 'label'],
  emits: ['update:modelValue']
}
</script>
