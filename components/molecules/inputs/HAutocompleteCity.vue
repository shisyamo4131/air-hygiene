<script>
/**
 * @create 2023-10-02
 * @author shisyamo4131
 */
import AAutocomplete from '~/components/atoms/inputs/AAutocomplete.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { AAutocomplete },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    prefCode: { type: String, required: true },
    returnObject: { type: Boolean, default: false, required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      itemText: 'name',
      itemValue: 'code',
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    items() {
      return this.$CITY_ARRAY(this.prefCode)
    },
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    prefCode(newVal, oldVal) {
      oldVal &&
        newVal !== oldVal &&
        this.$emit('input', this.returnObject ? null : '')
    },
  },
}
</script>

<template>
  <a-autocomplete
    v-bind="$attrs"
    :items="items"
    :item-text="itemText"
    :item-value="itemValue"
    :return-object="returnObject"
    v-on="$listeners"
  />
</template>

<style></style>
