<template>
  <div>
    <h-template-editor :tabs="['aaa', 'bbb']">
      <template #tab-0>
        <v-text-field v-for="n in 20" :key="n" />
      </template>
    </h-template-editor>
  </div>
</template>

<script>
import TestData from '~/assets/defaultSites.json'
import HTemplateEditor from '~/components/templates/HTemplateEditor.vue'
export default {
  components: { HTemplateEditor },
  data() {
    return {
      items: TestData,
    }
  },
  methods: {},
}
</script>

<style></style>
