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
   * DATA
   ******************************************************************/
  data() {
    return {
      items: this.$PREFECTURE_ARRAY,
      itemText: 'name',
      itemValue: 'code',
    }
  },
}
</script>

<template>
  <a-autocomplete
    v-bind="$attrs"
    :items="items"
    :item-text="itemText"
    :item-value="itemValue"
    v-on="$listeners"
  />
</template>

<style></style>
