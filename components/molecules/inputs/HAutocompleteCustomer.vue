<script>
/**
 * @author shisyamo4131
 */
import HAutocompleteApi from '~/components/molecules/inputs/HAutocompleteApi.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { HAutocompleteApi },
}
</script>

<template>
  <h-autocomplete-api
    v-bind="$attrs"
    collection="Customers"
    item-text="abbr"
    v-on="$listeners"
  >
    <template #item="{ item, attrs, on }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-content>
          <v-list-item-title>{{ item.abbr }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.address1 }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </h-autocomplete-api>
</template>

<style></style>
