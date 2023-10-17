<script>
/**
 * @create 2023-10-02
 * @author shisyamo4131
 */
import { doc, getDoc } from 'firebase/firestore'
import HTemplateMunicipalPermissionsDetail from '~/components/templates/municipalPermissions/HTemplateMunicipalPermissionsDetail.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'PermissionsDetail',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateMunicipalPermissionsDetail },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const docRef = doc(app.$firestore, `MunicipalPermissions/${docId}`)
    const snapshot = await getDoc(docRef)
    const model = app.$MunicipalPermission()
    model.initialize(snapshot.data())
    return { model }
  },
}
</script>

<template>
  <h-template-municipal-permissions-detail :model="model" />
</template>

<style></style>
