<script>
/**
 * @create 2023-10-06
 * @author shisyamo4131
 */
import { doc, getDoc } from 'firebase/firestore'
import HTemplateUnitsDetail from '~/components/templates/units/HTemplateUnitsDetail.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'UnitsDetail',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateUnitsDetail },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const docRef = doc(app.$firestore, `Units/${docId}`)
    const snapshot = await getDoc(docRef)
    const model = app.$CollectItem()
    model.initialize(snapshot.data())
    return { model }
  },
}
</script>

<template>
  <h-template-units-detail :model="model" />
</template>

<style></style>
