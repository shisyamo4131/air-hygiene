<script>
import { collection, onSnapshot } from 'firebase/firestore'
/**
 * @author shisyamo4131
 */
import HTemplateSitesDetail from '~/components/templates/sites/HTemplateSitesDetail.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'SitesDetail',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateSitesDetail },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const model = app.$Site()
    await model.fetch(docId)
    const listeners = {
      siteUnitPrices: null,
    }
    const siteUnitPrices = []
    listeners.siteUnitPrices = onSnapshot(
      collection(app.$firestore, `Sites/${docId}/SiteUnitPrices`),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const item = change.doc.data()
          const index = siteUnitPrices.findIndex(
            ({ docId }) => docId === item.docId
          )
          if (change.type === 'added') siteUnitPrices.push(item)
          if (change.type === 'modified') siteUnitPrices.splice(index, 1, item)
          if (change.type === 'removed') siteUnitPrices.splice(index, 1)
        })
      }
    )
    return { docId, model, siteUnitPrices, listeners }
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      municipalContracts: [],
    }
  },
  /******************************************************************
   * DESTROYED
   ******************************************************************/
  destroyed() {
    Object.keys(this.listeners).forEach((key) => {
      if (this.listeners[key]) this.listeners[key]()
    })
  },
}
</script>

<template>
  <h-template-sites-detail
    :model="model"
    :municipal-contracts="municipalContracts"
    :site-unit-prices="siteUnitPrices"
  />
</template>

<style></style>
