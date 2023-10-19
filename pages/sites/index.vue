<script>
/**
 * @author shisyamo4131
 */
import { collection, onSnapshot } from 'firebase/firestore'
import HTemplateSitesIndex from '~/components/templates/sites/HTemplateSitesIndex.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'SitesIndex',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateSitesIndex },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ app }) {
    const items = []
    const colRef = collection(app.$firestore, 'Sites')
    const listener = onSnapshot(colRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const item = change.doc.data()
        const index = items.findIndex(({ docId }) => docId === item.docId)
        if (change.type === 'added') items.push(item)
        if (change.type === 'modified') items.splice(index, 1, item)
        if (change.type === 'removed') items.splice(index, 1)
      })
    })
    return { items, listener }
  },
  /******************************************************************
   * DESTROYED
   ******************************************************************/
  destroyed() {
    if (this.listener) this.listener()
  },
}
</script>

<template>
  <div>
    <h-template-sites-index :items="items" />
  </div>
</template>

<style></style>
