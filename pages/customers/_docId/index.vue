<script>
/**
 * @author shisyamo4131
 */
import HTemplateCustomersDetail from '~/components/templates/customers/HTemplateCustomersDetail.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'CustomersDetail',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateCustomersDetail },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const model = app.$Customer()
    await model.fetch(docId)
    return { docId, model }
  },
}
</script>

<template>
  <h-template-customers-detail :model="model" />
</template>

<style></style>
