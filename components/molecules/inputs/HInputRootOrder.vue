<script>
/**
 * ### HInputRootOrder
 *
 * @author shisyamo4131
 */
import draggable from 'vuedraggable'
import Mixin from '~/components/molecules/inputs/HMixinInput.vue'
import ADate from '~/components/atoms/inputs/ADate.vue'
import ASelect from '~/components/atoms/inputs/ASelect.vue'
import ATextFieldSearch from '~/components/atoms/inputs/ATextFieldSearch.vue'
import ADataIterator from '~/components/atoms/tables/ADataIterator.vue'
import ASwitch from '~/components/atoms/inputs/ASwitch.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: {
    ADate,
    ASelect,
    draggable,
    ATextFieldSearch,
    ADataIterator,
    ASwitch,
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
    sun: { type: Array, default: () => [], required: false },
    mon: { type: Array, default: () => [], required: false },
    tue: { type: Array, default: () => [], required: false },
    wed: { type: Array, default: () => [], required: false },
    thu: { type: Array, default: () => [], required: false },
    fri: { type: Array, default: () => [], required: false },
    sat: { type: Array, default: () => [], required: false },
    /* for layout */
    height: { type: [String, Number], default: undefined, required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      days: [
        { text: '日曜日', value: 'sun' },
        { text: '月曜日', value: 'mon' },
        { text: '火曜日', value: 'tue' },
        { text: '水曜日', value: 'wed' },
        { text: '木曜日', value: 'thu' },
        { text: '金曜日', value: 'fri' },
        { text: '土曜日', value: 'sat' },
      ],
      customFilter: (items, search) => {
        const result = items
          .filter(({ status }) => {
            if (this.includeExpired) return true
            return status === 'active'
          })
          .filter(({ docId }) => {
            return !this[this.selectedDay].includes(docId)
          })
          .filter((item) => {
            if (!search) return true
            if (item.name.includes(search)) return true
            if (item.abbr.includes(search)) return true
            if (item.address1.includes(search)) return true
            return false
          })
        return result
      },
      includeExpired: false,
      selectedDay: 'sun',
      search: null,
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    containerHeight() {
      if (!this.height) return undefined
      const inputHeight = 74
      return parseInt(this.height) - inputHeight
    },
    leftContainerHeight() {
      if (!this.containerHeight) return undefined
      return this.containerHeight
    },
    rightContainerHeight() {
      if (!this.containerHeight) return undefined
      const toolbarHeight = 48
      const paginationHeight = 48
      return this.containerHeight - toolbarHeight - paginationHeight
    },
    currentOrders: {
      get() {
        const result = this[this.selectedDay].map((siteId) => {
          const site = this.$store.getters['masters/Site'](siteId)
          return site
        })
        return result
      },
      set(v) {
        const result = v.map(({ docId }) => docId)
        this.$emit(`update:${this.selectedDay}`, result)
      },
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    onClickRemove(i) {
      this.currentOrders = this.currentOrders.filter((_, index) => index !== i)
    },
  },
}
</script>

<template>
  <div>
    <v-row dense>
      <v-col>
        <a-date
          label="開始日"
          :value="date"
          required
          @input="$emit('update:date', $event)"
        />
      </v-col>
      <v-col>
        <a-select v-model="selectedDay" label="曜日" :items="days" />
      </v-col>
    </v-row>
    <v-container fluid class="pa-0">
      <v-row dense>
        <v-col cols="6">
          <v-card outlined>
            <v-list
              :style="`height: ${leftContainerHeight}px`"
              class="overflow-y-auto"
            >
              <draggable
                v-model="currentOrders"
                group="siteIds"
                :style="{ padding: currentOrders.length ? undefined : '24px' }"
              >
                <v-list-item
                  v-for="(site, index) of currentOrders"
                  :key="index"
                >
                  <v-list-item-icon>
                    {{ index + 1 }}
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ `${site.abbr}` }}
                      <v-chip
                        v-if="site.status !== 'active'"
                        color="error"
                        x-small
                        class="ml-2"
                        >契約満了</v-chip
                      >
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ `${site.address1}` }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon @click="onClickRemove(index)">mdi-close</v-icon>
                  </v-list-item-action>
                </v-list-item>
              </draggable>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card outlined>
            <v-toolbar dense flat>
              <a-text-field-search v-model="search" clearable />
              <a-switch
                v-model="includeExpired"
                class="ml-4"
                hide-details
                label="契約満了を含める"
              />
            </v-toolbar>
            <a-data-iterator
              :items="$store.state.masters.Sites"
              :custom-filter="customFilter"
              hide-default-footer
              :search="search"
              sort-by="abbrKana"
            >
              <template #default="{ items }">
                <v-list
                  dense
                  :style="`height: ${rightContainerHeight}px`"
                  class="overflow-y-auto"
                >
                  <draggable :value="items" group="siteIds" :sort="false">
                    <v-list-item v-for="(site, index) of items" :key="index">
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ `${site.abbr}` }}
                          <v-chip
                            v-if="site.status !== 'active'"
                            color="error"
                            x-small
                            class="ml-2"
                            >契約満了</v-chip
                          >
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ `${site.address1}` }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </draggable>
                </v-list>
              </template>
              <template #footer="{ pagination, updateOptions }">
                <div
                  style="height: 48px"
                  class="d-flex justify-center align-center"
                >
                  <v-pagination
                    color="primary"
                    :value="pagination.page"
                    :length="pagination.pageCount"
                    @input="updateOptions({ page: $event })"
                  />
                </div>
              </template>
            </a-data-iterator>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style></style>
