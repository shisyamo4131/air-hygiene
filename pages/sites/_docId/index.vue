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
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const model = app.$Site()
    await model.fetch(docId)
    return { docId, model }
  },
  data() {
    return {
      municipalContracts: [],
      unitPrices: [],
    }
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
