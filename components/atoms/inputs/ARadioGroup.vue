<script>
/**
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * MODEL
   ******************************************************************/
  model: { prop: 'value', event: 'change' },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    items: { type: Array, default: () => [], required: false },
    itemText: { type: String, default: 'text', required: false },
    itemValue: { type: String, default: 'value', required: false },
  },
}
</script>

<template>
  <v-radio-group v-bind="$attrs" v-on="$listeners">
    <v-radio
      v-for="(item, index) of items"
      :key="index"
      :label="item[itemText]"
      :value="item[itemValue]"
    />
  </v-radio-group>
</template>

<style></style>
