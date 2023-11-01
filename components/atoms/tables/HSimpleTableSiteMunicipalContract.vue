<script>
/**
 * ### HSimpleTableSiteMunicipalContract
 * 一般廃棄物の契約情報（MunicipalContract）を表示するためのテーブルです。
 *
 * #### PROPS
 * v-bindを使用してデータモデルをバインドしてください。
 *
 * @create 2023-10-09
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    docId: { type: String, default: '', required: false },
    date: { type: String, default: '', required: false },
    unitPrice: { type: Number, default: null, required: false },
    average: { type: Number, default: null, required: false },
    frequency: { type: Number, default: null, required: false },
    preMethod: { type: String, default: '', required: false },
    prefCode: { type: String, default: '', required: false },
    cityCode: { type: String, default: '', required: false },
    remarks: { type: String, default: '', required: false },
  },
}
</script>

<template>
  <v-simple-table class="default">
    <tbody>
      <tr>
        <td>契約日</td>
        <td>
          {{ `${date}` }}
        </td>
      </tr>
      <tr>
        <td>契約単価（税抜）</td>
        <td>
          {{ `${(unitPrice || 0).toFixed(2)} 円/kg` }}
        </td>
      </tr>
      <tr>
        <td>月平均収集回数</td>
        <td>
          {{ `${average || 0} 回/月` }}
        </td>
      </tr>
      <tr>
        <td>月平均収集量</td>
        <td>{{ `${frequency || 0} kg/月` }}</td>
      </tr>
      <tr>
        <td>契約前収集形態</td>
        <td>{{ $PRE_METHOD[preMethod] }}</td>
      </tr>
      <tr>
        <td>実績提出先</td>
        <td>
          {{ `${$PREFECTURE[prefCode]}${$CITY[cityCode]}` }}
        </td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<style scoped>
.default tr > td:nth-child(2) {
  text-align: right;
}
</style>
