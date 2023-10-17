<script>
/**
 * @create 2023-10-03
 * @author shisyamo4131
 */
import { doc, getDoc } from 'firebase/firestore'
import HTemplateItemsEdit from '~/components/templates/items/HTemplateItemsEdit.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'ItemsEdit',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateItemsEdit },
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
  <h-template-items-edit :model="model" />
</template>

<style></style>
