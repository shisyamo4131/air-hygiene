<script>
/**
 * @author shisyamo4131
 */
import HInputUnit from '~/components/molecules/inputs/HInputUnit.vue'
import Mixin from '~/components/templates/mixins/HTemplateMixinsEditor.vue'

export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HInputUnit },
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
      editModel: this.$Unit(),
    }
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    afterSubmit(mode) {
      return new Promise((resolve) => {
        if (mode === 'REGIST' || mode === 'UPDATE') {
          this.$router.replace(`/units/${this.editModel.docId}`)
        } else {
          this.$router.replace(`/units`)
        }
        resolve()
      })
    },
  },
}
</script>

<template>
  <air-template-edit
    label="単位編集"
    :edit-mode="editMode"
    :loading="loading"
    @click:submit="onClickSubmit($event)"
    @click:back="onClickBack"
  >
    <template #itembar-items> </template>
    <template #default="{ editMode }">
      <v-card-text>
        <h-input-unit v-bind.sync="editModel" :edit-mode="editMode" />
        <air-dialog-confirm-delete
          v-if="editMode !== 'REGIST'"
          @click:delete="onClickDelete"
        >
          <template #activator="{ attrs, on }">
            <v-btn
              v-bind="attrs"
              color="error"
              :disabled="loading || !editModel.deletable"
              small
              v-on="on"
              >削除する</v-btn
            >
          </template>
        </air-dialog-confirm-delete>
      </v-card-text>
    </template>
  </air-template-edit>
</template>

<style></style>
