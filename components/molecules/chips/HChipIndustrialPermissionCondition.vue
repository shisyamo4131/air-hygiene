<script>
/**
 * @create 2023-10-02
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    value: { type: String, required: true },
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    label() {
      const today = this.$dayjs().format('YYYY-MM-DD')
      return this.value >= today ? '有効' : '失効'
    },
    color() {
      const today = this.$dayjs().format('YYYY-MM-DD')
      return this.value >= today ? 'primary' : 'error'
    },
  },
}
</script>

<template>
  <v-chip v-bind="$attrs" :color="color" v-on="$listeners">
    {{ label }}
  </v-chip>
</template>

<style></style>
