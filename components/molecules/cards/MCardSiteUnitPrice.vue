<script>
/**
 * ### MCardSiteUnitPrice
 *
 * - A component used to display, add, modify, and delete SiteUnitPrice.
 *
 * @author shisyamo4131
 */
import ADataTableSiteUnitPriceDetails from '~/components/atoms/tables/ADataTableSiteUnitPriceDetails.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { ADataTableSiteUnitPriceDetails },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    siteId: { type: String, required: true },
    date: { type: String, required: true },
    details: { type: Array, required: true },
  },
}
</script>

<template>
  <v-card v-bind="$attrs">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          {{ $dayjs(date).format('YYYY年MM月DD日') }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <a-data-table-site-unit-price-details
      :items="details"
      hide-default-footer
      :items-per-page="-1"
    />
    <v-card-actions>
      <v-btn block color="primary" text @click="$emit('click:edit')">
        回収単価を編集する
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style></style>
