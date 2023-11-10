<script>
/**
 * ### HPageEditor
 *
 * @author shisyamo4131
 */
import HInputCollectItem from '../molecules/inputs/HInputCollectItem.vue'
import HInputCustomer from '../molecules/inputs/HInputCustomer.vue'
import HInputSite from '../molecules/inputs/HInputSite.vue'
import HInputUnit from '../molecules/inputs/HInputUnit.vue'
import HTemplateDefault from './HTemplateDefault.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    HInputCollectItem,
    HInputCustomer,
    HInputSite,
    HInputUnit,
    HTemplateDefault,
  },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    beforeRegist: {
      type: Function,
      default: () => {
        return new Promise((resolve) => resolve(true))
      },
      required: false,
    },
    beforeUpdate: {
      type: Function,
      default: () => {
        return new Promise((resolve) => resolve(true))
      },
      required: false,
    },
    beforeDelete: {
      type: Function,
      default: () => {
        return new Promise((resolve) => resolve(true))
      },
      required: false,
    },
    collection: { type: String, required: true },
    defaultItem: { type: Object, default: undefined, required: false },
    docId: { type: String, default: undefined, required: false },
    editMode: {
      type: String,
      validator: (v) => ['REGIST', 'UPDATE', 'DELETE'].includes(v),
      required: true,
    },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      collections: {
        CollectItems: {
          label: '回収品目',
          component: 'HInputCollectItem',
          editItem: this.$CollectItem(),
        },
        Customers: {
          label: '取引先',
          component: 'HInputCustomer',
          editItem: this.$Customer(),
        },
        Sites: {
          label: '排出場所',
          component: 'HInputSite',
          editItem: this.$Site(),
        },
        Units: {
          label: '単位',
          component: 'HInputUnit',
          editItem: this.$Unit(),
        },
      },
      editItem: null,
      isDelete: false,
      loading: false,
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    component() {
      if (!this.collection) return undefined
      return this.collections[this.collection]?.component || undefined
    },
    deletable() {
      if (this.editMode === 'REGIST') return false
      if (!this.editItem) return false
      if ('deletable' in this.editItem) {
        return this.editItem.deletable
      }
      return true
    },
    label() {
      if (!this.collection) return undefined
      const label = this.collections[this.collection]?.label || 'undefined'
      if (this.editMode === 'REGIST') return `${label}登録`
      if (this.editMode === 'UPDATE') return `${label}編集`
      return `${label}削除`
    },
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    collection: {
      handler(v) {
        this.editItem = this.collections[v].editItem
      },
      immediate: true,
    },
  },
  /******************************************************************
   * MOUNTED
   ******************************************************************/
  mounted() {
    if (this.editMode === 'REGIST' || !this.docId) return
    // this.editItem.fetch(this.docId)
    if (!this.editItem) return
    this.editItem.initialize(this.defaultItem)
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    validate() {
      const result = this.$refs.form.validate()
      if (!result) alert('入力に不備があります。')
      return result
    },
    async onClickSubmit() {
      const editMode = this.isDelete ? 'DELETE' : this.editMode
      if (editMode !== 'DELETE' && !this.validate()) return
      try {
        this.loading = true
        const docRef = await this.submit(editMode)
        if (!docRef) return
        this.$emit('submitted', { editMode, docId: docRef.id })
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.loading = false
      }
    },
    async submit(mode) {
      try {
        const getDocRef = async (mode) => {
          switch (mode) {
            case 'REGIST':
              if (!(await this.beforeRegist())) return undefined
              return await this.editItem.create()
            case 'UPDATE':
              if (!(await this.beforeUpdate())) return undefined
              return await this.editItem.update()
            case 'DELETE':
              if (!(await this.beforeDelete())) return undefined
              return await this.editItem.delete()
          }
        }
        const docRef = await getDocRef(mode)
        return docRef
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      }
    },
  },
}
</script>

<template>
  <h-template-default
    v-bind="$attrs"
    :label="label"
    :decrease="48"
    v-on="$listeners"
  >
    <template #default>
      <v-container fluid>
        <v-form ref="form" :disabled="loading">
          <component
            :is="component"
            v-bind.sync="editItem"
            :edit-mode="editMode"
          />
          <v-switch
            v-if="deletable"
            v-model="isDelete"
            label="削除する"
            color="error"
          />
        </v-form>
      </v-container>
    </template>
    <template #footer>
      <v-toolbar dense flat>
        <v-btn :disabled="loading" outlined @click="$emit('click:cancel')"
          >cancel</v-btn
        >
        <v-spacer />
        <v-btn
          color="primary"
          :disabled="loading"
          :loading="loading"
          @click="onClickSubmit"
          >submit</v-btn
        >
      </v-toolbar>
    </template>
  </h-template-default>
</template>

<style></style>
