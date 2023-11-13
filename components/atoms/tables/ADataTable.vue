<script>
/**
 * ### ADataTable
 *
 * ‐ The footer height is subtracted when the height property is specified.
 *
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    fixedHeader: { type: Boolean, default: true, required: false },
    hideDefaultFooter: { type: Boolean, default: false, required: false },
    page: { type: Number, default: 1, required: false },
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    footerHeight() {
      if (this.hideDefaultFooter) return 0
      return 59
    },
    internalHeight() {
      const height = this.$attrs?.height || undefined
      if (!height) return undefined
      return height - this.footerHeight
    },
  },
  /******************************************************************
   * WATCH
   ******************************************************************/
  watch: {
    page() {
      this.scrollToTop()
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    scrollToTop() {
      const wrapper = this.$el.querySelector('div.v-data-table__wrapper')
      this.$vuetify.goTo(this, { container: wrapper })
    },
  },
}
</script>

<template>
  <v-data-table
    v-bind="{ ...$props, ...$attrs }"
    :height="internalHeight"
    v-on="$listeners"
  >
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </v-data-table>
</template>

<style></style>
