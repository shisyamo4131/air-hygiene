<script>
/**
 * @author shisyamo4131
 */
import HInputCustomer from '~/components/molecules/inputs/HInputCustomer.vue'
import HTemplateEditor from '~/components/templates/HTemplateEditor.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'CustomersEdit',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateEditor, HInputCustomer },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const editItem = app.$Customer()
    await editItem.fetch(docId)
    return { docId, editItem }
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      loading: false,
    }
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    async onClickSubmit() {
      if (!this.$refs.template.validate()) return
      try {
        this.loading = true
        await this.editItem.update()
        this.$router.push(`/customers/${this.docId}`)
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
  <h-template-editor
    ref="template"
    label="取引先編集"
    edit-mode="UPDATE"
    :loading="loading"
    @click:cancel="$router.push(`/customers/${docId}`)"
    @click:submit="onClickSubmit"
  >
    <template #default="props">
      <h-input-customer
        v-bind.sync="editItem"
        :edit-mode="props.editMode"
        :loading="props.loading"
      />
    </template>
  </h-template-editor>
</template>

<style></style>
