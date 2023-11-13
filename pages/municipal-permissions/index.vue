<script>
/**
 * @author shisyamo4131
 */
import { collection, onSnapshot } from 'firebase/firestore'
import HTemplateDefault from '~/components/templates/HTemplateDefault.vue'
import HDataTableMunicipalPermissions from '~/components/molecules/tables/HDataTableMunicipalPermissions.vue'
import HBtnRegist from '~/components/molecules/btns/HBtnRegist.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'MunicipalPermissionsIndex',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateDefault, HDataTableMunicipalPermissions, HBtnRegist },
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
  <h-template-default label="一般廃棄物処理業許可管理">
    <template #append-toolbar>
      <h-btn-regist
        icon
        @click="$router.push(`/municipal-permissions/regist`)"
      />
    </template>
    <template #default="{ height }">
      <h-data-table-municipal-permissions
        :height="height"
        :items="items"
        @click:row="$router.push(`/municipal-permissions/${$event.docId}`)"
      />
    </template>
  </h-template-default>
</template>

<style></style>
