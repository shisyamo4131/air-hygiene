<script>
/**
 * @create 2023-10-03
 * @author shisyamo4131
 */
import HInputItem from '~/components/molecules/inputs/HInputItem.vue'
import Mixin from '~/components/templates/mixins/HTemplateMixinsEditor.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { HInputItem },
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
      editModel: this.$Item(),
    }
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    afterSubmit() {
      return new Promise((resolve) => {
        this.$router.replace(`/items/${this.editModel.docId}`)
        resolve()
      })
    },
  },
}
</script>

<template>
  <air-template-edit
    label="回収品目追加"
    edit-mode="REGIST"
    :loading="loading"
    @click:submit="onClickSubmit($event)"
    @click:back="onClickBack"
  >
    <template #default="{ editMode }">
      <v-card-text>
        <h-input-item v-bind.sync="editModel" :edit-mode="editMode" />
      </v-card-text>
    </template>
  </air-template-edit>
</template>

<style></style>
