<script>
/**
 * @author shisyamo4131
 */
import HInputItemUnitPrice from './HInputItemUnitPrice.vue'
import ATextField from '~/components/atoms/inputs/ATextField.vue'
import Mixin from '~/components/molecules/inputs/HInputMixin.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextField,
    HInputItemUnitPrice,
  },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [Mixin],
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    date: { type: String, default: '', required: false },
    prices: { type: Array, default: () => [], required: false },
    isEditing: { type: Boolean, default: false, required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      defaultItem: {
        itemId: '',
        unitId: '',
        price: null,
      },
      editIndex: -1,
      editItem: {
        itemId: '',
        unitId: '',
        price: null,
      },
      headers: [
        { text: '回収品目', value: 'itemId' },
        { text: '金額', value: 'price', align: 'right' },
        { text: '', value: 'actions', align: 'right', sortable: false },
      ],
      onboarding: 0,
    }
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    onboarding(v) {
      this.$emit('update:isEditing', v !== 0)
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    showEditor(index) {
      this.initialize(index)
      this.onboarding = 1
    },
    initialize(index) {
      this.editIndex = index
      if (this.editIndex === -1) {
        this.editItem = JSON.parse(JSON.stringify(this.defaultItem))
      } else {
        this.editItem = JSON.parse(JSON.stringify(this.prices[this.editIndex]))
      }
      this.$refs.form.resetValidation()
    },
    validate() {
      const result = this.$refs.form.validate()
      if (!result) {
        alert('入力に不備があります。')
      }
      return result
    },
    onClickSubmit() {
      if (!this.validate()) return
      const result = this.prices.map((item) => item)
      if (this.editIndex === -1) result.push(this.editItem)
      if (this.editIndex !== -1) result.splice(this.editIndex, 1, this.editItem)
      this.$emit('update:prices', result)
      this.onboarding = 0
    },
  },
}
</script>

<template>
  <div>
    <a-text-field
      label="開始日"
      :value="date"
      required
      input-type="date"
      @input="$emit('update:date', $event)"
    />
    <v-window v-model="onboarding">
      <v-window-item>
        <v-data-table
          :headers="headers"
          :items="prices"
          hide-default-footer
          :items-per-page="-1"
        >
          <template #top>
            <v-toolbar dense flat>
              <v-toolbar-title>単価</v-toolbar-title>
              <v-spacer />
              <v-btn icon @click="showEditor(-1)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-toolbar>
          </template>
          <template #[`item.itemId`]="{ item }">
            {{ $store.getters['masters/Item'](item.itemId).abbr }}
          </template>
          <template #[`item.price`]="{ item }">
            {{
              `${item.price.toFixed(2)}円/${
                $store.getters['masters/Unit'](item.unitId).name
              }`
            }}
          </template>
          <template #[`item.actions`]="{ index }">
            <v-icon class="mr-2" small @click="showEditor(index)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="showEditor(index)">mdi-trash-can</v-icon>
          </template>
        </v-data-table>
      </v-window-item>
      <v-window-item eager>
        <v-card outlined>
          <v-card-text>
            <v-form ref="form">
              <h-input-item-unit-price v-bind.sync="editItem" />
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-space-between">
            <v-btn icon @click="onboarding = 0">
              <v-icon>mdi-cancel</v-icon>
            </v-btn>
            <v-btn icon @click="onClickSubmit">
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-window-item>
    </v-window>
  </div>
</template>

<style></style>
