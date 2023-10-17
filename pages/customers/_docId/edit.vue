<script>
/**
 * @create 2023-09-26
 * @author shisyamo4131
 */
import { doc, getDoc } from 'firebase/firestore'
import HTemplateCustomersEdit from '~/components/templates/customers/HTemplateCustomersEdit.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'CustomersEdit',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateCustomersEdit },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const docRef = doc(app.$firestore, `Customers/${docId}`)
    const snapshot = await getDoc(docRef)
    const model = app.$Customer()
    model.initialize(snapshot.data())
    return { model }
  },
}
</script>

<template>
  <h-template-customers-edit :model="model" />
</template>

<style></style>
