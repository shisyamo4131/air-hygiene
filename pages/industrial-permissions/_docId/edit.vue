<script>
/**
 * @create 2023-10-02
 * @author shisyamo4131
 */
import { doc, getDoc } from 'firebase/firestore'
import HTemplateIndustrialPermissionsEdit from '~/components/templates/industrialPermissions/HTemplateIndustrialPermissionsEdit.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'PermissionsEdit',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateIndustrialPermissionsEdit },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const docRef = doc(app.$firestore, `IndustrialPermissions/${docId}`)
    const snapshot = await getDoc(docRef)
    const model = app.$IndustrialPermission()
    model.initialize(snapshot.data())
    return { model }
  },
}
</script>

<template>
  <h-template-industrial-permissions-edit :model="model" />
</template>

<style></style>
