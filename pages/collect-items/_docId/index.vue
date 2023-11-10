<script>
/**
 * @author shisyamo4131
 */
import HPageDetail from '~/components/templates/HPageDetail.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'CollectItemsDetail',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HPageDetail },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const item = app.$CollectItem()
    await item.fetch(docId)
    return { docId, item }
  },
}
</script>

<template>
  <h-page-detail
    collection="CollectItems"
    :item="item"
    @click:back="$router.go(-1)"
    @click:edit="$router.push(`/collect-items/${docId}/edit`)"
  />
</template>

<style></style>
