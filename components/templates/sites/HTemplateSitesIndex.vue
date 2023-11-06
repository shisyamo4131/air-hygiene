<script>
/**
 * @author shisyamo4131
 */
import ASwitch from '~/components/atoms/inputs/ASwitch.vue'
import HCardIndexSite from '~/components/molecules/cards/HCardIndexSite.vue'
import AAutocompleteCustomer from '~/components/atoms/inputs/AAutocompleteCustomer.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HCardIndexSite, ASwitch, AAutocompleteCustomer },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    items: { type: Array, required: true },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      customFilter: (items, search) => {
        return items
          .filter((item) => {
            if (!this.selectedCustomer) return true
            return item.customer.docId === this.selectedCustomer
          })
          .filter((item) => {
            if (this.includeExpired) return true
            return item.condition === 'active'
          })
          .filter((item) => {
            if (!search) return true
            if (item.code.includes(search)) return true
            if (item.abbr.includes(search)) return true
            if (item.abbrKana.includes(search)) return true
            if (item.address1.includes(search)) return true
            return false
          })
      },
      includeExpired: false,
      selectedCustomer: undefined,
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    cols() {
      return { cols: 12, sm: 6, md: 4 }
    },
    itemsPerPageOptions() {
      return [
        { text: '6件', value: 6 },
        { text: '12件', value: 12 },
        { text: '18件', value: 18 },
        { text: '全て', value: -1 },
      ]
    },
  },
}
</script>

<template>
  <air-template-data-iterator
    v-bind="$attrs"
    :data-table-props="{ customFilter, sortBy: 'code', sortDesc: true }"
    :items="items"
    :items-per-page="12"
    :items-per-page-options="itemsPerPageOptions"
    label="排出場所一覧"
    show-itembar
    v-on="$listeners"
  >
    <template #append-label>
      <v-btn icon @click="$router.push(`/sites/regist`)">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <template #itembar-items>
      <a-autocomplete-customer
        v-model="selectedCustomer"
        label="取引先"
        hide-details
        class="mr-4"
        clearable
      />
      <a-switch
        v-model="includeExpired"
        hide-details
        label="契約満了を含める"
      />
    </template>
    <template #default="props">
      <v-container fluid>
        <v-row>
          <v-col
            v-for="(item, index) of props.items"
            :key="index"
            v-bind="cols"
          >
            <h-card-index-site
              outlined
              v-bind="item"
              :to="`/sites/${item.docId}`"
            />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </air-template-data-iterator>
</template>

<style></style>
