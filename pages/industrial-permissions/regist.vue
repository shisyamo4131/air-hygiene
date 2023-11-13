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
  name: 'IndustrialPermissionsRegist',
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HTemplateEditor, HInputIndustrialPermission },
  /******************************************************************
   * ASYNCDATA
   ******************************************************************/
  asyncData({ app }) {
    const editItem = app.$IndustrialPermission()
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
        this.$router.push(`/industrial-permissions/${docRef.id}`)
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
    label="産業廃棄物処理業許可登録"
    :loading="loading"
    edit-mode="REGIST"
    @click:cancel="$router.push(`/industrial-permissions`)"
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
