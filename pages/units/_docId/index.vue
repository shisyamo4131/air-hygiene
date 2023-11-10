<script>
/**
 * @create 2023-10-06
 * @author shisyamo4131
 */
import HPageDetail from '~/components/templates/HPageDetail.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'UnitsDetail',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HPageDetail },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const item = app.$Unit()
    await item.fetch(docId)
    return { docId, item }
  },
}
</script>

<template>
  <h-page-detail
    collection="Units"
    :item="item"
    @click:back="$router.go(-1)"
    @click:edit="$router.push(`/units/${docId}/edit`)"
  />
</template>

<style></style>
