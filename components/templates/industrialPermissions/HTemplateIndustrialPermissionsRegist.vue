<script>
/**
 * @create 2023-10-02
 * @author shisyamo4131
 */
import HInputIndustrialPermission from '~/components/molecules/inputs/HInputIndustrialPermission.vue'
import Mixin from '~/components/templates/mixins/HTemplateMixinsEditor.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HInputIndustrialPermission },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [Mixin],
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {},
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      editModel: this.$IndustrialPermission(),
    }
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    afterSubmit() {
      return new Promise((resolve) => {
        this.$router.replace(`/industrial-permissions/${this.editModel.docId}`)
        resolve()
      })
    },
  },
}
</script>

<template>
  <air-template-edit
    label="産業廃棄物処理業許可追加"
    edit-mode="REGIST"
    :loading="loading"
    @click:submit="onClickSubmit($event)"
    @click:back="onClickBack"
  >
    <template #default="{ editMode }">
      <v-card-text>
        <h-input-industrial-permission
          v-bind.sync="editModel"
          :edit-mode="editMode"
        />
      </v-card-text>
    </template>
  </air-template-edit>
</template>

<style></style>
