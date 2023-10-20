<script>
/**
 * @author shisyamo4131
 */
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import HCrudSiteMunicipalContract from './HCrudSiteMunicipalContract.vue'
export default {
  components: { HCrudSiteMunicipalContract },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    /* requires this.$Site() */
    model: { type: Object, required: true },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      items: [],
      listener: null,
    }
  },
  /******************************************************************
   * MOUNTED
   ******************************************************************/
  mounted() {
    this.setListener()
  },
  /******************************************************************
   * DESTROYED
   ******************************************************************/
  destroyed() {
    if (this.listener) this.listener()
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    setListener() {
      const path = `Sites/${this.model.docId}/SiteMunicipalContracts`
      const colRef = collection(this.$firestore, path)
      const q = query(colRef, orderBy('date', 'desc'))
      this.listener = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const item = change.doc.data()
          const index = this.items.findIndex(
            ({ docId }) => docId === item.docId
          )
          if (change.type === 'added') this.items.push(item)
          if (change.type === 'modified') this.items.splice(index, 1, item)
          if (change.type === 'removed') this.items.splice(index)
        })
      })
    },
  },
}
</script>

<template>
  <div>
    <v-timeline align-top :dense="$vuetify.breakpoint.mobile">
      <v-timeline-item>
        <h-crud-site-municipal-contract outlined :site-id="model.docId" />
      </v-timeline-item>
      <v-timeline-item v-for="(item, index) of items" :key="index">
        <h-crud-site-municipal-contract
          outlined
          :site-id="model.docId"
          :model="item"
        />
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<style></style>
