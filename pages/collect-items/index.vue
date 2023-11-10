<script>
/**
 * @author shisyamo4131
 */
import HPageIndex from '~/components/templates/HPageIndex.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'CollectItemsIndex',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HPageIndex },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ store }) {
    const items = store.state.masters.CollectItems
    return { items }
  },
}
</script>

<template>
  <h-page-index
    :items="items"
    collection="CollectItems"
    @click:regist="$router.push('/collect-items/regist')"
    @click:row="$router.push(`/collect-items/${$event.docId}`)"
  />
</template>

<style></style>
