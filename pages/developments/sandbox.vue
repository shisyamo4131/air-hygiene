<template>
  <div>
    <h-text-field-date v-model="value" />
  </div>
</template>

<script>
import HTextFieldDate from '~/components/molecules/inputs/HTextFieldDate.vue'
export default {
  components: { HTextFieldDate },
  data() {
    return {
      value: '2023-10-01',
    }
  },
}
</script>

<style></style>
