<script>
/**
 * @author shisyamo4131
 */
import ANumeric from '~/components/atoms/inputs/ANumeric.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { ANumeric },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    unitId: { type: String, default: '', required: false },
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    suffix() {
      if (!this.unitId) return '円'
      const unit = this.$store.getters['masters/Unit'](this.unitId)
      if (!unit) return '円'
      return `円/${unit.abbr}`
    },
  },
}
</script>

<template>
  <a-numeric
    v-bind="$attrs"
    class="right-input"
    decimal-places="2"
    :suffix="suffix"
    v-on="$listeners"
  />
</template>

<style></style>
