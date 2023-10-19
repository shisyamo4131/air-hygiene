<script>
/**
 * @author shisyamo4131
 */
import HTemplateCustomersEditor from '~/components/templates/customers/HTemplateCustomersEditor.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'CustomersEdit',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateCustomersEditor },
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
  <h-template-customers-editor edit-mode="UPDATE" :model="model" />
</template>

<style></style>
