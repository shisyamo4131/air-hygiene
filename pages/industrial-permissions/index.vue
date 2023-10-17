<script>
import { ref } from 'firebase/database'
/**
 * @create 2023-10-02
 * @author shisyamo4131
 */
import HTemplateIndustrialPermissionsIndex from '~/components/templates/industrialPermissions/HTemplateIndustrialPermissionsIndex.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'IndustrialPermissionsIndex',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateIndustrialPermissionsIndex },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ app }) {
    const dbRef = ref(app.$database, `IndexPages/IndustrialPermissions`)
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
  <h-template-industrial-permissions-index :items="items" />
</template>

<style></style>
