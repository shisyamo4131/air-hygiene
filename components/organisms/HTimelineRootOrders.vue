<script>
/**
 * ### HTimelineRootOrders
 *
 * @author shisyamo4131
 */
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import HCardFormInput from '../molecules/cards/HCardFormInput.vue'
// import HDataTableRootOrderDetails from '../molecules/tables/HDataTableRootOrderDetails.vue'
import HBtnEdit from '../molecules/btns/HBtnEdit.vue'
import HInputRootOrder from '../molecules/inputs/HInputRootOrder.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HCardFormInput,
    // HDataTableRootOrderDetails,
    HBtnEdit,
    HInputRootOrder,
  },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    rootId: { type: String, required: true },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editMode: 'REGIST',
      editItem: this.$RootOrder(),
      editor: false,
      items: [],
      listener: null,
      loading: false,
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    internalItems() {
      return this.items
        .map((item) => item)
        .sort((a, b) => {
          if (a.date < b.date) return 1
          if (a.date > b.date) return -1
          return 0
        })
    },
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    editor(v) {
      v || this.initialize()
    },
    rootId: {
      handler(v) {
        if (v) {
          this.editItem.rootId = v
          this.subscribe()
        } else {
          this.unsubscribe()
        }
      },
      immediate: true,
    },
  },
  /******************************************************************
   * DESTROYED
   ******************************************************************/
  destroyed() {
    this.unsubscribe()
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    initialize() {
      this.editItem.initialize({ rootId: this.rootId })
      this.editMode = 'REGIST'
      this.$refs.form.initialize()
    },
    validate() {
      if (!this.editItem.orders.length) {
        alert('１つ以上の回収単価を設定する必要があります。')
        return false
      }
      return true
    },
    unsubscribe() {
      if (this.listener) this.listener()
    },
    subscribe() {
      const colRef = collection(this.$firestore, 'RootOrders')
      const q = query(colRef, where('rootId', '==', this.rootId))
      this.listener = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const item = change.doc.data()
          const index = this.items.findIndex(
            ({ docId }) => docId === item.docId
          )
          if (change.type === 'added') this.items.push(item)
          if (change.type === 'modified') this.items.splice(index, 1, item)
          if (change.type === 'removed') this.items.splice(index, 1)
        })
      })
    },
    onClickEdit(item) {
      this.editItem.initialize(item)
      this.editMode = 'UPDATE'
      this.editor = true
    },
    async onClickSubmit(mode) {
      if (mode !== 'DELETE' && !this.$refs.form.validate()) return
      if (mode !== 'DELETE' && !this.validate()) return
      try {
        this.loading = true
        if (mode === 'REGIST') await this.editItem.create()
        if (mode === 'UPDATE') await this.editItem.update()
        if (mode === 'DELETE') await this.editItem.delete()
        this.editor = false
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <v-timeline v-bind="$attrs" v-on="$listeners">
    <v-timeline-item small>
      <v-card outlined>
        <v-card-text>
          <v-dialog v-model="editor" persistent max-width="720">
            <template #activator="{ attrs, on }">
              <v-btn v-bind="attrs" block color="primary" v-on="on"
                >新しい回収順序を登録する</v-btn
              >
            </template>
            <h-card-form-input
              ref="form"
              :edit-mode="editMode"
              :loading="loading"
              @click:cancel="editor = false"
              @click:submit="onClickSubmit"
            >
              <template #default="props">
                <h-input-root-order
                  v-bind.sync="editItem"
                  :edit-mode="props.editMode"
                  :loading="props.loading"
                />
              </template>
            </h-card-form-input>
          </v-dialog>
        </v-card-text>
      </v-card>
    </v-timeline-item>
    <v-timeline-item v-for="(item, index) of internalItems" :key="index" small>
      <v-card outlined>
        <v-toolbar dense flat>
          {{ item.date }}
          <v-spacer />
          <h-btn-edit icon @click="onClickEdit(item)" />
        </v-toolbar>
        <!-- <h-data-table-site-unit-price-details
          :items="item.orders"
          hide-toolbar
          hide-pagination
          :items-per-page="-1"
        /> -->
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<style></style>
