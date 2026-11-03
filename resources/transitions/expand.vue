<template>
  <transition class="w-full" name="expand" @enter="enter" @leave="leave" @after-enter="afterEnter">
    <slot/>
  </transition>
</template>

<script>
export default {
  methods :{
    enter(element) {
      element.style.width = getComputedStyle(element).width;
      element.style.position = 'absolute';
      element.style.visibility = 'hidden';
      element.style.height = 'auto';

      const height = getComputedStyle(element).height;

      element.style.width = null;
      element.style.position = null;
      element.style.visibility = null;
      element.style.height = 0;
      getComputedStyle(element).height;

      requestAnimationFrame(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = 'auto';
    },
    leave(element) {
      element.style.height = getComputedStyle(element).height;
      getComputedStyle(element).height;

      requestAnimationFrame(() => {
        element.style.height = 0;
      });
    },
  }
}
</script>

<style scoped>

</style>
