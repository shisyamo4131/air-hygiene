<script>
/**
 * @author shisyamo4131
 */
import ASwitch from '~/components/atoms/inputs/ASwitch.vue'
import HCardIndexCustomer from '~/components/molecules/cards/HCardIndexCustomer.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HCardIndexCustomer, ASwitch },
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
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    cols() {
      return { cols: 12, sm: 6, md: 4 }
    },
  },
}
</script>

<template>
  <air-template-data-iterator
    v-bind="$attrs"
    :data-table-props="{ customFilter, sortBy: 'code', sortDesc: true }"
    :items="items"
    label="取引先一覧"
    show-itembar
    v-on="$listeners"
  >
    <template #append-label>
      <v-btn icon @click="$router.push(`/customers/regist`)">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <template #itembar-items>
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
            <h-card-index-customer
              outlined
              :model="item"
              :to="`/customers/${item.docId}`"
            />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </air-template-data-iterator>
</template>

<style></style>
