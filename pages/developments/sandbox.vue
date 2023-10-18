<template>
  <air-template-default>
    <v-container>
      <h-crud-item-unit-prices />
    </v-container>
  </air-template-default>
</template>

<script>
import { collection, limit, onSnapshot, query } from 'firebase/firestore'
import HCrudItemUnitPrices from '~/components/organisms/HCrudItemUnitPrices.vue'
export default {
  components: { HCrudItemUnitPrices },
  data() {
    return {
      items: [],
    }
  },
  mounted() {
    const colRef = collection(this.$firestore, 'Sites')
    const q = query(colRef, limit(500))
    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const item = change.doc.data()
        const index = this.items.findIndex(({ docId }) => docId === item.docId)
        if (change.type === 'added') this.items.push(item)
        if (change.type === 'modified') this.items.splice(index, 1, item)
        if (change.type === 'removed') this.items.splice(index, 1)
      })
    })
  },
}
</script>

<style></style>
