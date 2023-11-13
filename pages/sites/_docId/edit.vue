<script>
/**
 * @author shisyamo4131
 */
import HInputSite from '~/components/molecules/inputs/HInputSite.vue'
import HTemplateEditor from '~/components/templates/HTemplateEditor.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'SitesEdit',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateEditor, HInputSite },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const editItem = app.$Site()
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
        this.$router.push(`/sites/${this.docId}`)
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
    label="排出場所編集"
    edit-mode="UPDATE"
    :loading="loading"
    @click:cancel="$router.push(`/sites/${docId}`)"
    @click:submit="onClickSubmit"
  >
    <template #default="props">
      <h-input-site
        v-bind.sync="editItem"
        :edit-mode="props.editMode"
        :loading="props.loading"
      />
    </template>
  </h-template-editor>
</template>

<style></style>
