<script>
/**
 * @create 2023-09-25
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * MODEL
   ******************************************************************/
  model: {
    prop: 'value',
    event: 'change',
  },
}
</script>

<template>
  <v-radio-group v-bind="$attrs" v-on="$listeners">
    <v-radio
      v-for="(item, index) of $EDIT_MODE_ARRAY"
      :key="index"
      :label="item.text"
      :value="item.value"
    />
  </v-radio-group>
</template>

<style></style>
