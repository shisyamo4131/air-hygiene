<script>
/**
 * @author shisyamo4131
 */
import Mixin from '~/components/molecules/inputs/HMixinInput.vue'
import ADate from '~/components/atoms/inputs/ADate.vue'
export default {
  /******************************************************************
   * COMPONENTS
   ******************************************************************/
  components: { ADate },
  /******************************************************************
   * MIXINS
   ******************************************************************/
  mixins: [Mixin],
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    date: { type: String, default: '', required: false },
    orders: { type: Array, default: () => [], required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {}
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    notIncluded() {
      const result = this.$store.state.masters.Sites.map(({ docId }) => docId)
      return result
    },
  },
}
</script>

<template>
  <div>
    <a-date
      label="開始日"
      :value="date"
      required
      @input="$emit('update:date', $event)"
    />
    <v-row>
      <v-col>
        <v-list-item v-for="siteId of orders" :key="siteId">
          <v-list-item-content>
            <v-list-item-title>{{ siteId }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col>
        <v-list-item v-for="siteId of notIncluded" :key="siteId">
          <v-list-item-content>
            <v-list-item-title>{{ siteId }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </div>
</template>

<style></style>
