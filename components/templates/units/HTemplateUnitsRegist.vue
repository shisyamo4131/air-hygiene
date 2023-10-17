<script>
/**
 * @create 2023-10-06
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
    afterSubmit() {
      return new Promise((resolve) => {
        this.$router.replace(`/units/${this.editModel.docId}`)
        resolve()
      })
    },
  },
}
</script>

<template>
  <air-template-edit
    label="単位追加"
    edit-mode="REGIST"
    :loading="loading"
    @click:submit="onClickSubmit($event)"
    @click:back="onClickBack"
  >
    <template #default="{ editMode }">
      <v-card-text>
        <h-input-unit v-bind.sync="editModel" :edit-mode="editMode" />
      </v-card-text>
    </template>
  </air-template-edit>
</template>

<style></style>
