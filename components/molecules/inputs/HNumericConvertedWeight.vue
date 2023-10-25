<template>
  <a-numeric
    v-bind="$attrs"
    label="換算重量"
    class="right-input"
    decimal-places="2"
    suffix="kg"
    v-on="$listeners"
  >
    <template #append-outer>
      <v-tooltip top>
        <template #activator="{ attrs, on }">
          <v-icon v-bind="attrs" v-on="on">mdi-help-circle-outline</v-icon>
        </template>
        <div>実績報告に集計する際の重量を入力します。</div>
        <div>
          回収品目が一般廃棄物または産業廃棄物でない場合、入力は不要です。
        </div>
      </v-tooltip>
    </template>
  </a-numeric>
</template>

<script>
import ANumeric from '~/components/atoms/inputs/ANumeric.vue'
export default {
  components: { ANumeric },
}
</script>

<style></style>
