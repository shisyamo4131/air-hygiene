<script>
/**
 * ### HSimpleTableSite
 * 排出場所情報（Site）を表示するためのテーブルです。
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
    code: { type: String, default: '', required: false },
    name: { type: String, default: '', required: false },
    abbr: { type: String, default: '', required: false },
    abbrKana: { type: String, default: '', required: false },
    zipcode: { type: String, default: '', required: false },
    address1: { type: String, default: '', required: false },
    address2: { type: String, default: '', required: false },
    tel: { type: String, default: '', required: false },
    fax: { type: String, default: '', required: false },
    url: { type: String, default: '', required: false },
    staffName: { type: String, default: '', required: false },
    staffEmail: { type: String, default: '', required: false },
    condition: { type: String, default: '', required: false },
    remarks: { type: String, default: '', required: false },
    customer: { type: Object, default: null, required: false },
  },
}
</script>

<template>
  <v-simple-table class="default">
    <tbody>
      <tr>
        <td>CODE</td>
        <td>{{ code }}</td>
      </tr>
      <tr>
        <td>排出場所名</td>
        <td>{{ name }}</td>
      </tr>
      <tr>
        <td>略称</td>
        <td>
          <div class="text-caption grey--text text--lighten-1">
            {{ abbrKana }}
          </div>
          <div>{{ abbr }}</div>
        </td>
      </tr>
      <tr>
        <td>住所</td>
        <td>{{ `${address1} ${address2}` }}</td>
      </tr>
      <tr>
        <td>TEL/FAX</td>
        <td>{{ `${tel} / ${fax}` }}</td>
      </tr>
      <tr>
        <td>URL</td>
        <td>{{ url }}</td>
      </tr>
      <tr>
        <td>担当者</td>
        <td>
          {{ staffName }}
          <span v-if="staffEmail">({{ staffEmail }})</span>
        </td>
      </tr>
      <tr>
        <td>状態</td>
        <td>
          {{ $CUSTOMER_CONDITION[condition] }}
        </td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<style scoped></style>
