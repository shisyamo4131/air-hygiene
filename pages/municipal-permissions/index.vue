<script>
/**
 * @author shisyamo4131
 */
import { collection, onSnapshot } from 'firebase/firestore'
import HPageIndex from '~/components/templates/HPageIndex.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'MunicipalPermissionsIndex',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HPageIndex },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ app }) {
    const items = []
    const colRef = collection(app.$firestore, 'MunicipalPermissions')
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
  <h-page-index
    :items="items"
    collection="MunicipalPermissions"
    @click:regist="$router.push('/municipal-permissions/regist')"
    @click:row="$router.push(`/municipal-permissions/${$event.docId}`)"
  />
</template>

<style></style>
