<script>
/**
 * @author shisyamo4131
 */
import HInputIndustrialPermission from '~/components/molecules/inputs/HInputIndustrialPermission.vue'
import HTemplateEditor from '~/components/templates/HTemplateEditor.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'IndustrialPermissionsEdit',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateEditor, HInputIndustrialPermission },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const editItem = app.$IndustrialPermission()
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
        this.$router.push(`/industrial-permissions/${this.docId}`)
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
    label="廃棄物処理業許可編集"
    edit-mode="UPDATE"
    :loading="loading"
    @click:cancel="$router.push(`/industrial-permissions/${docId}`)"
    @click:submit="onClickSubmit"
  >
    <template #default="props">
      <h-input-industrial-permission
        v-bind.sync="editItem"
        :edit-mode="props.editMode"
        :loading="props.loading"
      />
    </template>
  </h-template-editor>
</template>

<style></style>
