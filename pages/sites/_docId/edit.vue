<script>
/**
 * @create 2023-09-29
 * @author shisyamo4131
 */
import { doc, getDoc } from 'firebase/firestore'
import HTemplateSitesEdit from '~/components/templates/sites/HTemplateSitesEdit.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'SitesEdit',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateSitesEdit },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const docRef = doc(app.$firestore, `Sites/${docId}`)
    const snapshot = await getDoc(docRef)
    const model = app.$Site()
    model.initialize(snapshot.data())
    return { model }
  },
}
</script>

<template>
  <h-template-sites-edit :model="model" />
</template>

<style></style>
