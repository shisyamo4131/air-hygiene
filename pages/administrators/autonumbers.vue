<script>
/**
 * @author shisyamo4131
 */
import { collection, onSnapshot } from 'firebase/firestore'
import HBtnRegist from '~/components/molecules/btns/HBtnRegist.vue'
import HCardFormInput from '~/components/molecules/cards/HCardFormInput.vue'
import HInputAutonumber from '~/components/molecules/inputs/HInputAutonumber.vue'
import HDataTableAutonumbers from '~/components/molecules/tables/HDataTableAutonumbers.vue'
import HTemplateDefault from '~/components/templates/HTemplateDefault.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'AutonumbersIndex',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HTemplateDefault,
    HDataTableAutonumbers,
    HBtnRegist,
    HCardFormInput,
    HInputAutonumber,
  },
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
      editor: false,
      editItem: this.$Autonumber(),
      loading: false,
    }
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    editor(v) {
      v || this.initialize()
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
    initialize() {
      this.editMode = 'REGIST'
      this.editItem.initialize()
      this.$refs.form.initialize()
    },
    async onClickSubmit(mode) {
      if (mode !== 'DELETE' && !this.$refs.form.validate()) return
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
    onClickRow(item) {
      this.editMode = 'UPDATE'
      this.editItem.initialize(item)
      this.editor = true
    },
  },
}
</script>

<template>
  <h-template-default label="自動採番管理">
    <template #append-toolbar>
      <v-dialog v-model="editor" max-width="360" persistent>
        <template #activator="{ attrs, on }">
          <h-btn-regist v-bind="attrs" icon v-on="on" />
        </template>
        <h-card-form-input
          ref="form"
          :edit-mode="editMode"
          :label="`自動採番${editMode === 'REGIST' ? '登録' : '編集'}`"
          :loading="loading"
          @click:cancel="editor = false"
          @click:submit="onClickSubmit"
        >
          <template #default="props">
            <h-input-autonumber
              v-bind.sync="editItem"
              :edit-mode="props.editMode"
              :loading="props.loading"
            />
          </template>
        </h-card-form-input>
      </v-dialog>
    </template>
    <template #default="{ height }">
      <h-data-table-autonumbers
        :height="height"
        :items="items"
        @click:row="onClickRow($event)"
      />
    </template>
  </h-template-default>
</template>

<style></style>
