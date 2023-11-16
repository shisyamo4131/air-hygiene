<script>
/**
 * ### HItemGroupDays
 *
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * MODEL
   ******************************************************************/
  model: { prop: 'value', event: 'change' },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    disabled: { type: Boolean, default: false, required: false },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      dayList: [
        { text: '日', value: 'sun' },
        { text: '月', value: 'mon' },
        { text: '火', value: 'tue' },
        { text: '水', value: 'wed' },
        { text: '木', value: 'thu' },
        { text: '金', value: 'fri' },
        { text: '土', value: 'sat' },
      ],
    }
  },
}
</script>

<template>
  <v-item-group v-bind="$attrs" v-on="$listeners">
    <v-row>
      <v-col v-for="day in dayList" :key="day.value" class="flex-grow-0">
        <v-item
          v-slot="{ active, toggle }"
          :value="day.value"
          :disabled="disabled"
        >
          <v-checkbox
            :input-value="active"
            :label="day.text"
            @change="toggle"
          />
        </v-item>
      </v-col>
    </v-row>
  </v-item-group>
</template>

<style></style>
