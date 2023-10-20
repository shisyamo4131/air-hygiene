<script>
/**
 * @author shisyamo4131
 */
import HDataTableItemUnitPrices from '../molecules/tables/HDataTableItemUnitPrices.vue'
export default {
  components: { HDataTableItemUnitPrices },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    docId: { type: String, required: true },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      today: this.$dayjs().format('YYYY-MM-DD'),
      model: this.$Site(),
      unitPrice: this.$SiteUnitPrice(this.docId),
      listeners: {
        unitPrice: null,
      },
    }
  },
  /******************************************************************
   * MOUNTED
   ******************************************************************/
  mounted() {
    this.model.fetch(this.docId)
    this.listeners.unitPrice = this.unitPrice.fetchLatestSync(this.today)
  },
  /******************************************************************
   * DESTROYED
   ******************************************************************/
  destroyed() {
    Object.keys(this.listeners).forEach((key) => {
      if (this.listeners[key]) this.listeners[key]()
    })
  },
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ model.name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ model.customer?.abbr || '' }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-card outlined>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon class="blue">mdi-currency-jpy</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>回収単価</v-list-item-title>
              <v-list-item-subtitle>
                {{ `${$dayjs().format('YYYY年MM月DD日')} 現在` }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <h-data-table-item-unit-prices
            :items="unitPrice?.prices || []"
            hide-default-footer
            :items-per-page="-1"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
