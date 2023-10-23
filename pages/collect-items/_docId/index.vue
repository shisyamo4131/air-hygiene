<script>
/**
 * @author shisyamo4131
 */
import { doc, getDoc } from 'firebase/firestore'
import HTemplateCollectItemsDetail from '~/components/templates/collectItems/HTemplateCollectItemsDetail.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'CollectItemsDetail',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateCollectItemsDetail },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const docRef = doc(app.$firestore, `CollectItems/${docId}`)
    const snapshot = await getDoc(docRef)
    const model = app.$Item()
    model.initialize(snapshot.data())
    return { model }
  },
}
</script>

<template>
  <h-template-collect-items-detail :model="model" />
</template>

<style></style>
