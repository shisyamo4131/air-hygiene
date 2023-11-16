<script>
/**
 * @author shisyamo4131
 */
import AAutocomplete from '~/components/atoms/inputs/AAutocomplete.vue'
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { AAutocomplete },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    label: { type: String, default: '取引先', required: false },
    filter: {
      type: Function,
      default: (item, queryText, itemText) => {
        if (item.code.includes(queryText)) return true
        if (item.name1.includes(queryText)) return true
        if (item.abbr.includes(queryText)) return true
        if (item.abbrKana.includes(queryText)) return true
        return false
      },
    },
  },
}
</script>

<template>
  <a-autocomplete
    v-bind="{ ...$props, ...$attrs }"
    item-text="abbr"
    item-value="docId"
    v-on="$listeners"
  >
    <template #item="{ item, attrs, on }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-content>
          <v-list-item-title>
            {{ `[${item.code}] ${item.abbr}` }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ item.address1 }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </a-autocomplete>
</template>

<style></style>
