<script>
/**
 * @author shisyamo4131
 */
import HTemplateSitesDetail from '~/components/templates/sites/HTemplateSitesDetail.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'SitesDetail',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateSitesDetail },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ store, route }) {
    const docId = route.params.docId
    const model = store.getters['masters/Site'](docId)
    const municipalContracts = []
    const unitPrices = []
    return { model, municipalContracts, unitPrices }
  },
}
</script>

<template>
  <h-template-sites-detail
    :model="model"
    :municipal-contracts="municipalContracts"
    :unit-prices="unitPrices"
  />
</template>

<style></style>
