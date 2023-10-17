<script>
/**
 * @create 2023-10-13
 * @author shisyamo4131
 */
import HTemplateUnitsIndex from '~/components/templates/units/HTemplateUnitsIndex.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'UnitsIndex',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateUnitsIndex },
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
  <h-template-units-index :items="items" />
</template>

<style></style>
