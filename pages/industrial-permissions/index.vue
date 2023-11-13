<script>
/**
 * @author shisyamo4131
 */
import { collection, onSnapshot } from 'firebase/firestore'
import HTemplateDefault from '~/components/templates/HTemplateDefault.vue'
import HDataTableIndustrialPermissions from '~/components/molecules/tables/HDataTableIndustrialPermissions.vue'
import HBtnRegist from '~/components/molecules/btns/HBtnRegist.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'IndustrialPermissionsIndex',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateDefault, HDataTableIndustrialPermissions, HBtnRegist },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ app }) {
    const items = []
    const colRef = collection(app.$firestore, 'IndustrialPermissions')
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
  <h-template-default label="産業廃棄物処理業許可管理">
    <template #append-toolbar>
      <h-btn-regist
        icon
        @click="$router.push(`/industrial-permissions/regist`)"
      />
    </template>
    <template #default="{ height }">
      <h-data-table-industrial-permissions
        :height="height"
        :items="items"
        @click:row="$router.push(`/industrial-permissions/${$event.docId}`)"
      />
    </template>
  </h-template-default>
</template>

<style></style>
