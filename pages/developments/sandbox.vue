<template>
  <air-template-default>
    <v-container>
      {{ items }}
    </v-container>
  </air-template-default>
</template>

<script>
import { collection, getDocs, query } from 'firebase/firestore'
export default {
  async asyncData({ app }) {
    const colRef = collection(app.$firestore, 'Sites')
    const q = query(colRef)
    const snapshot = await getDocs(q)
    const items = snapshot.docs.map((doc) => doc.data())
    return { items }
  },
  data() {
    return {}
  },
}
</script>

<style></style>
