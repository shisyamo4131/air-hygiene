<script>
/**
 * @create 2023-10-06
 * @author shisyamo4131
 */
import { doc, getDoc } from 'firebase/firestore'
import HTemplateUnitsEdit from '~/components/templates/units/HTemplateUnitsEdit.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'UnitsEdit',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateUnitsEdit },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const docRef = doc(app.$firestore, `Units/${docId}`)
    const snapshot = await getDoc(docRef)
    const model = app.$Item()
    model.initialize(snapshot.data())
    return { model }
  },
}
</script>

<template>
  <h-template-units-edit :model="model" />
</template>

<style></style>
