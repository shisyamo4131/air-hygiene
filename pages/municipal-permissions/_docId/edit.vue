<script>
/**
 * @author shisyamo4131
 */
import HInputMunicipalPermission from '~/components/molecules/inputs/HInputMunicipalPermission.vue'
import HTemplateEditor from '~/components/templates/HTemplateEditor.vue'
export default {
  /******************************************************************
   * NAME
   ******************************************************************/
  name: 'MunicipalPermissionsEdit',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateEditor, HInputMunicipalPermission },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  async asyncData({ app, route }) {
    const docId = route.params.docId
    const editItem = app.$MunicipalPermission()
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
        this.$router.push(`/municipal-permissions/${this.docId}`)
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
    label="一般廃棄物処理業許可編集"
    edit-mode="UPDATE"
    :loading="loading"
    @click:cancel="$router.push(`/municipal-permissions/${docId}`)"
    @click:submit="onClickSubmit"
  >
    <template #default="props">
      <h-input-municipal-permission
        v-bind.sync="editItem"
        :edit-mode="props.editMode"
        :loading="props.loading"
      />
    </template>
  </h-template-editor>
</template>

<style></style>
