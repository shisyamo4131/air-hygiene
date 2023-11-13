<template>
  <div>
    <slot name="default" v-bind="{ items: value, add, modify, remove }" />
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Array, default: () => [], required: false },
  },
  methods: {
    add(item) {
      const result = this.value.map((item) => item)
      result.push(JSON.parse(JSON.stringify(item)))
      this.$emit('input', result)
    },
    modify(item, index) {
      const result = this.value.map((item) => item)
      result.splice(index, 1, JSON.parse(JSON.stringify(item)))
      this.$emit('input', result)
    },
    remove(index) {
      const result = this.value.map((item) => item)
      result.splice(index, 1)
      this.$emit('input', result)
    },
  },
}
</script>

<style></style>
