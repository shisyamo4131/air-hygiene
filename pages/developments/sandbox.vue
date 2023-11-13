<template>
  <div>
    <h-template-tabs :tabs="['aaa', 'bbb']">
      <template #tab-0>
        <v-text-field v-for="n in 20" :key="n" />
      </template>
    </h-template-tabs>
  </div>
</template>

<script>
import TestData from '~/assets/defaultSites.json'
import HTemplateTabs from '~/components/templates/HTemplateTabs.vue'
export default {
  components: { HTemplateTabs },
  data() {
    return {
      items: TestData,
    }
  },
  methods: {},
}
</script>

<style></style>
