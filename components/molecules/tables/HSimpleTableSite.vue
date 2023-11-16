<script>
import HItemGroupDays from '../itemGroups/HItemGroupDays.vue'
/**
 * ### HSimpleTableSite
 *
 * @author shisyamo4131
 */
export default {
  components: { HItemGroupDays },
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
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
    status: { type: String, default: '', required: false },
    dateExpired: { type: String, default: '', required: false },
    remarks: { type: String, default: '', required: false },
    customerId: { type: String, default: '', required: false },
    collectDays: { type: Array, default: () => [], required: false },
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
        <td>取引先</td>
        <td>
          {{
            $store.getters['masters/Customer'](customerId)?.abbr || 'undefined'
          }}
        </td>
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
        <td>担当者</td>
        <td>
          {{ staffName }}
          <span v-if="staffEmail">({{ staffEmail }})</span>
        </td>
      </tr>
      <tr>
        <td>回収日</td>
        <td>
          <h-item-group-days :value="collectDays" multiple disabled />
        </td>
      </tr>
      <tr>
        <td>状態</td>
        <td>
          {{ $SITE_STATUS[status] }}
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
