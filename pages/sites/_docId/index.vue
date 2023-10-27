<script>
/**
 * @author shisyamo4131
 */
import { collection, onSnapshot, query, where } from 'firebase/firestore'
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
  asyncData({ route }) {
    const docId = route.params.docId
    return { docId }
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      model: this.$Site(),
      listeners: {
        SiteUnitPrices: null,
      },
      items: {
        SiteUnitPrices: [],
      },
      municipalContracts: [],
    }
  },
  /******************************************************************
   * MOUNTED
   ******************************************************************/
  mounted() {
    this.model.fetch(this.docId)
    this.subscribeSiteUnitPrices()
  },
  /******************************************************************
   * DESTROYED
   ******************************************************************/
  destroyed() {
    Object.keys(this.listeners).forEach((key) => {
      if (this.listeners[key]) this.listeners[key]()
    })
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    subscribeSiteUnitPrices() {
      const colRef = collection(this.$firestore, 'SiteUnitPrices')
      const q = query(colRef, where('siteId', '==', this.docId))
      const items = this.items.SiteUnitPrices
      this.listeners.SiteUnitPrices = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const item = change.doc.data()
          const index = items.findIndex(({ docId }) => docId === item.docId)
          if (change.type === 'added') items.push(item)
          if (change.type === 'modified') items.splice(index, 1, item)
          if (change.type === 'removed') items.splice(index, 1)
        })
      })
    },
  },
}
</script>

<template>
  <h-template-sites-detail
    :model="model"
    :municipal-contracts="municipalContracts"
    :site-unit-prices="items.SiteUnitPrices"
  />
</template>

<style></style>
