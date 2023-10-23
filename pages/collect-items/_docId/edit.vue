<script>
/**
 * @author shisyamo4131
 */
import { doc, getDoc } from 'firebase/firestore'
import HTemplateCollectItemsEdit from '~/components/templates/collectItems/HTemplateCollectItemsEdit.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'CollectItemsEdit',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateCollectItemsEdit },
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
  <h-template-collect-items-edit :model="model" />
</template>

<style></style>
