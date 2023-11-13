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
  name: 'MunicipalPermissionsRegist',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateEditor, HInputMunicipalPermission },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ app }) {
    const editItem = app.$MunicipalPermission()
    return { editItem }
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
        const docRef = await this.editItem.create()
        this.$router.push(`/municipal-permissions/${docRef.id}`)
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
    label="一般廃棄物処理業許可登録"
    :loading="loading"
    edit-mode="REGIST"
    @click:cancel="$router.push(`/municipal-permissions`)"
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
