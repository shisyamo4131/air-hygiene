<script>
/**
 * @author shisyamo4131
 */
import HPageDetail from '~/components/templates/HPageDetail.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'MunicipalPermissionsDetail',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HPageDetail },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const item = app.$MunicipalPermission()
    await item.fetch(docId)
    return { docId, item }
  },
}
</script>

<template>
  <h-page-detail
    collection="MunicipalPermissions"
    :item="item"
    @click:back="$router.push(`/municipal-permissions`)"
    @click:edit="$router.push(`/municipal-permissions/${docId}/edit`)"
  />
</template>

<style></style>
