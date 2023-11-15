<script>
/**
 * ### HInputCollectionResult
 *
 * @author shisyamo4131
 */
import HDataTableCollectionResultDetails from '../tables/HDataTableCollectionResultDetails.vue'
import HBtnRegist from '../btns/HBtnRegist.vue'
import HInputCollectionResultDetail from './HInputCollectionResultDetail.vue'
import ATextarea from '~/components/atoms/inputs/ATextarea.vue'
import Mixin from '~/components/molecules/inputs/HMixinInput.vue'
import ANumeric from '~/components/atoms/inputs/ANumeric.vue'
import AAutocomplete from '~/components/atoms/inputs/AAutocomplete.vue'
import ATextField from '~/components/atoms/inputs/ATextField.vue'
import HTemplateArrayInput from '~/components/templates/HTemplateArrayInput.vue'
import ADate from '~/components/atoms/inputs/ADate.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ATextarea,
    ANumeric,
    AAutocomplete,
    ATextField,
    HTemplateArrayInput,
    HInputCollectionResultDetail,
    HDataTableCollectionResultDetails,
    HBtnRegist,
    ADate,
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
    site: { type: Object, default: null, required: false },
    resultType: { type: String, default: '', required: false },
    rootId: { type: String, default: '', required: false },
    details: { type: Array, default: () => [], required: false },
    municipalWeight: { type: Number, default: null, required: false },
    industrialWeight: { type: Number, default: null, required: false },
    dateDeadline: { type: String, default: '', required: false },
    remarks: { type: String, default: '', required: false },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    updateDateDeadline() {
      if (!this.site || !this.date) return
      const deadline = this.site.customer.deadline
      const result = this.$airCalcDeadlineDate(this.date, deadline)
      this.$emit('update:dateDeadline', result)
    },
  },
}
</script>

<template>
  <v-row>
    <v-col cols="4" md="4">
      <a-date
        label="回収日"
        :value="date"
        required
        @change="updateDateDeadline"
        @input="$emit('update:date', $event)"
      />
      <a-autocomplete
        label="実績区分"
        auto-select-first
        :value="resultType"
        :items="$COLLECTION_RESULT_TYPE_ARRAY"
        required
        @input="$emit('update:resultType', $event)"
      />
      <a-text-field
        label="回収ルート"
        :value="rootId"
        :required="resultType === 'root'"
        :disabled="resultType !== 'root'"
        @input="$emit('update:rootId', $event)"
      />
      <a-numeric
        label="一廃重量"
        class="right-input"
        :value="municipalWeight"
        required
        :decimal-places="2"
        suffix="kg"
        @input="$emit('update:municipalWeight', $event)"
      />
      <a-numeric
        label="産廃重量"
        class="right-input"
        :value="industrialWeight"
        required
        :decimal-places="2"
        suffix="kg"
        @input="$emit('update:industrialWeight', $event)"
      />
      <a-date
        label="請求締日"
        :value="dateDeadline"
        required
        @input="$emit('update:dateDeadline', $event)"
      />
    </v-col>
    <v-col cols="8" md="8">
      <h-template-array-input
        :value="details"
        :dialog-props="{ maxWidth: 360 }"
        model="CollectionResultDetail"
        @input="$emit('update:details', $event)"
      >
        <template #default="{ attrs, on }">
          <h-input-collection-result-detail
            v-bind="attrs"
            :site-id="site?.docId || undefined"
            :date="date"
            v-on="on"
          />
        </template>
        <template #data-table="{ attrs, on }">
          <v-card outlined>
            <h-data-table-collection-result-details
              v-bind="attrs"
              height="352"
              hide-pagination
              hide-toolbar
              :items-per-page="-1"
              v-on="on"
            />
            <v-card-actions class="justify-end">
              <h-btn-regist color="primary" small @click="on['click:regist']" />
            </v-card-actions>
          </v-card>
        </template>
      </h-template-array-input>
    </v-col>
    <v-col cols="12">
      <a-textarea
        label="備考"
        :value="remarks"
        hide-details
        @input="$emit('update:remarks', $event)"
      />
    </v-col>
  </v-row>
</template>

<style></style>
