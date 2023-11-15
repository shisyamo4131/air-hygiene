<script>
/**
 * ### HDataTableCollectionResults
 *
 * @author shisyamo4131
 */
import HTextFieldYearMonth from '../inputs/HTextFieldYearMonth.vue'
import HDataTable from './HDataTable.vue'
import AAutocomplete from '~/components/atoms/inputs/AAutocomplete.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HDataTable, HTextFieldYearMonth, AAutocomplete },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    items: { type: Array, default: () => [], required: false },
    yearMonth: { type: String, default: '', required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      headers: [
        { text: '回収日', value: 'date' },
        { text: '実績区分', value: 'resultType' },
        { text: '回収ルート', value: 'rootId' },
        {
          text: '一廃重量',
          value: 'municipalWeight',
          align: 'right',
          sortable: false,
        },
        {
          text: '産廃重量',
          value: 'industrialWeight',
          align: 'right',
          sortable: false,
        },
        { text: '売上金額', value: 'sales', align: 'right', sortable: false },
        { text: '請求締日', value: 'dateDeadline' },
      ],
      resultType: undefined,
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    internalItems() {
      return this.items.filter((item) => {
        if (!this.resultType) return true
        return item.resultType === this.resultType
      })
    },
  },
}
</script>

<template>
  <h-data-table
    v-bind="$attrs"
    :headers="headers"
    :items="internalItems"
    v-on="$listeners"
  >
    <template #search>
      <h-text-field-year-month
        :value="yearMonth"
        hide-details
        :outlined="false"
        solo-inverted
        @input="$emit('update:yearMonth', $event)"
      />
      <v-spacer />
      <div style="max-width: 240px">
        <a-autocomplete
          v-model="resultType"
          placeholder="実績区分"
          :items="$COLLECTION_RESULT_TYPE_ARRAY"
          hide-details
          clearable
          prepend-inner-icon="mdi-magnify"
          :outlined="false"
          solo-inverted
        />
      </div>
    </template>
    <template #[`item.resultType`]="{ item }">
      {{ $COLLECTION_RESULT_TYPE[item.resultType] }}
    </template>
    <template #[`item.municipalWeight`]="{ item }">
      {{ `${$airNumericToSeparatedString(item?.municipalWeight || 0)}kg` }}
    </template>
    <template #[`item.industrialWeight`]="{ item }">
      {{ `${$airNumericToSeparatedString(item?.industrialWeight || 0)}kg` }}
    </template>
    <template #[`item.sales`]="{ item }">
      {{ `${$airNumericToSeparatedString(item?.sales || 0)}円` }}
    </template>
  </h-data-table>
</template>

<style></style>
