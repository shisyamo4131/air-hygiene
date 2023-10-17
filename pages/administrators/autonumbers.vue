<script>
/**
 * @create 2023-09-29
 * @author shisyamo4131
 */
import { collection, onSnapshot } from 'firebase/firestore'
import HInputAutonumber from '~/components/molecules/inputs/HInputAutonumber.vue'
export default {
  components: { HInputAutonumber },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ app }) {
    const items = []
    const unsubscribes = {}
    const colRef = collection(app.$firestore, 'Autonumbers')
    unsubscribes.items = onSnapshot(colRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const item = change.doc.data()
        const index = items.findIndex(({ docId }) => docId === item.docId)
        if (change.type === 'added') items.push(item)
        if (change.type === 'modified') items.splice(index, 1, item)
        if (change.type === 'removed') items.splice(index, 1)
      })
    })
    return { items, unsubscribes }
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editMode: 'REGIST',
      editModel: this.$Autonumber(),
      editor: false,
      headers: [
        { text: 'Collection', value: 'collectionName' },
        { text: 'Current', value: 'current' },
        { text: 'Length', value: 'length' },
        { text: 'Field', value: 'field' },
        { text: 'Condition', value: 'condition' },
        { text: 'Action', value: 'action', sortable: false },
      ],
      loading: false,
    }
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    editor(v) {
      if (!v) {
        this.editModel.initialize()
        this.editMode = 'REGIST'
        this.$refs.form.resetValidation()
      }
    },
  },
  /******************************************************************
   * DESTROYED
   ******************************************************************/
  destroyed() {
    Object.keys(this.unsubscribes).forEach((key) => {
      if (this.unsubscribes[key]) this.unsubscribes[key]()
    })
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    async onClickSubmit() {
      if (!this.$refs.form.validate()) {
        alert('入力に不備があります。')
        return
      }
      try {
        this.loading = true
        if (this.editMode === 'REGIST') await this.editModel.create()
        if (this.editMode === 'UPDATE') await this.editModel.update()
        if (this.editMode === 'DELETE') await this.editModel.delete()
        this.editor = false
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.loading = false
      }
    },
    onClickEdit(item) {
      this.editMode = 'UPDATE'
      this.editModel.initialize(item)
      this.editor = true
    },
    onClickDelete(item) {
      this.editMode = 'DELETE'
      this.editModel.initialize(item)
      this.editor = true
    },
  },
}
</script>

<template>
  <air-template-data-table
    label="自動採番管理"
    :headers="headers"
    :items="items"
  >
    <template #append-label>
      <v-dialog v-model="editor" max-width="480">
        <template #activator="{ attrs, on }">
          <v-btn v-bind="attrs" icon v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
        </template>
        <v-card outlined>
          <v-card-title>{{ editModel.collectionName }}</v-card-title>
          <v-card-text class="pt-5">
            <v-form ref="form" :disabled="loading || editMode === 'DELETE'">
              <h-input-autonumber
                v-bind.sync="editModel"
                :edit-mode="editMode"
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-space-between">
            <v-btn :disabled="loading" icon @click="editor = false"
              ><v-icon>mdi-cancel</v-icon></v-btn
            >
            <v-btn
              color="primary"
              :disabled="loading"
              :loading="loading"
              icon
              @click="onClickSubmit"
              ><v-icon>mdi-check</v-icon></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template #[`item.action`]="{ item }">
      <v-icon class="mr-2" @click="onClickEdit(item)">mdi-pencil</v-icon>
      <v-icon @click="onClickDelete(item)">mdi-trash-can</v-icon>
    </template>
  </air-template-data-table>
</template>

<style></style>
