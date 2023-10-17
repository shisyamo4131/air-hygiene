<script>
import { ref } from 'firebase/database'
/**
 * @create 2023-10-02
 * @author shisyamo4131
 */
import HTemplateMunicipalPermissionsIndex from '~/components/templates/municipalPermissions/HTemplateMunicipalPermissionsIndex.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'MunicipalPermissionsIndex',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateMunicipalPermissionsIndex },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ app }) {
    const dbRef = ref(app.$database, `IndexPages/MunicipalPermissions`)
    const subscribe = app.$airSubscribeDatabase(dbRef)
    return { items: subscribe.items, unsubscribe: subscribe.unsubscribe }
  },
  /******************************************************************
   * DESTROYED
   ******************************************************************/
  destroyed() {
    this.unsubscribe()
  },
}
</script>

<template>
  <h-template-municipal-permissions-index :items="items" />
</template>

<style></style>
