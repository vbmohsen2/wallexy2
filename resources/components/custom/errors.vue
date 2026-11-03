<template>
  <div class="alert-wrapper">
    <transition-group name="list-complete">
      <div v-for="error in errors" :key="error.key" class="list-complete-item ">
        <p :class="'alert-text mb-3 rounded-xl ardweb-' + error.type">
          <icon class="alert-icon" :name="icons.info"/>
          <span v-text="error.text"></span>
        </p>
      </div>
    </transition-group>
  </div>
</template>
<script>
  import {mdiInformationVariant} from '@mdi/js';

  export default {
    data() {
      return {
        icons: {
          info: mdiInformationVariant
        }
      }
    },
    computed: {
      errors() {
        return this.$store.state.alerts.pile
      }
    }
  }
</script>

