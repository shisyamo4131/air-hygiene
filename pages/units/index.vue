<script>
/**
 * @author shisyamo4131
 */
import HPageIndex from '~/components/templates/HPageIndex.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'UnitsIndex',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HPageIndex },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ store }) {
    const items = store.state.masters.Units
    return { items }
  },
}
</script>

<template>
  <h-page-index
    :items="items"
    collection="Units"
    @click:regist="$router.push('/units/regist')"
    @click:row="$router.push(`/units/${$event.docId}`)"
  />
</template>

<style></style>
