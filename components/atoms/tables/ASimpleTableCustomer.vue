<script>
/**
 * ### ASimpleTableCustomer
 *
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    code: { type: String, default: '', required: false },
    name1: { type: String, default: '', required: false },
    name2: { type: String, default: '', required: false },
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
    honor: { type: String, default: '', required: false },
    deadline: { type: String, default: '', required: false },
    depositMonth: { type: Number, default: null, required: false },
    depositDay: { type: String, default: '', required: false },
    rounding: { type: String, default: '', required: false },
    condition: { type: String, default: '', required: false },
    dateExpired: { type: String, default: '', required: false },
    remarks: { type: String, default: '', required: false },
  },
}
</script>

<template>
  <v-simple-table>
    <tbody>
      <tr>
        <td>CODE</td>
        <td>{{ code }}</td>
      </tr>
      <tr>
        <td>取引先名1</td>
        <td>{{ name1 }}</td>
      </tr>
      <tr>
        <td>取引先名2</td>
        <td>{{ name2 }}</td>
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
        <td>敬称</td>
        <td>{{ honor }}</td>
      </tr>
      <tr>
        <td>締日/入金サイト</td>
        <td>
          {{
            `${$DEADLINE[deadline]}締め / ${depositMonth}ヶ月後${$DEADLINE[depositDay]}`
          }}
        </td>
      </tr>
      <tr>
        <td>端数処理</td>
        <td>
          {{ $ROUNDING[rounding] }}
        </td>
      </tr>
      <tr>
        <td>状態</td>
        <td>
          {{ $CUSTOMER_CONDITION[condition] }}
        </td>
      </tr>
      <tr>
        <td>備考</td>
        <td>
          {{ remarks }}
        </td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<style></style>
