<template>
  <div>
    <h-input-collection-result-details
      v-model="value"
      :site-id="siteId"
      :date="date"
    />
  </div>
</template>

<script>
import HInputCollectionResultDetails from '~/components/molecules/inputs/HInputCollectionResultDetails.vue'
export default {
  components: {
    HInputCollectionResultDetails,
  },
  data() {
    return {
      siteId: '0hDaxOWY8tcp1hRQlcGN',
      date: '2023-10-01',
      value: [],
      editModel: this.$CollectionResultDetail(),
      item: '',
    }
  },
}
</script>

<style></style>
