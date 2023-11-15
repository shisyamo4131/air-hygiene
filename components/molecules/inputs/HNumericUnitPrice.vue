<script>
/***
 * ### HNumericUnitPrice
 *
 * @author shisyamo4131
 */
import ANumeric from '~/components/atoms/inputs/ANumeric.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { ANumeric },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      loading: false,
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    appendIcon() {
      if (this.loading) return 'mdi-autorenew mdi-spin'
      return undefined
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    async fetch(siteId, date, id) {
      try {
        this.loading = true
        const model = this.$SiteUnitPrice()
        const result = await model.fetchUnitPrice(siteId, date, id)
        if (result) this.$emit('input', result)
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
  <a-numeric
    v-bind="$attrs"
    class="right-input"
    decimal-places="2"
    :append-icon="appendIcon"
    suffix="円"
    v-on="$listeners"
  />
</template>

<style></style>
