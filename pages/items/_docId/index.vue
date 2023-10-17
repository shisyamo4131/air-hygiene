<script>
/**
 * @create 2023-10-03
 * @author shisyamo4131
 */
import { doc, getDoc } from 'firebase/firestore'
import HTemplateItemsDetail from '~/components/templates/items/HTemplateItemsDetail.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'ItemsDetail',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateItemsDetail },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const docRef = doc(app.$firestore, `Items/${docId}`)
    const snapshot = await getDoc(docRef)
    const model = app.$Item()
    model.initialize(snapshot.data())
    return { model }
  },
}
</script>

<template>
  <h-template-items-detail :model="model" />
</template>

<style></style>
