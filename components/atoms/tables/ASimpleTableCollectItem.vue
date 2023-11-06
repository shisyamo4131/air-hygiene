<script>
/**
 * ### ASimpleTableCollectItem
 *
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    code: { type: String, default: '', required: false },
    name: { type: String, default: '', required: false },
    nameKana: { type: String, default: '', required: false },
    abbr: { type: String, default: '', required: false },
    wasteDiv: { type: String, default: '', required: false },
    remarks: { type: String, default: '', required: false },
    deletable: { type: Boolean, default: true, required: false },
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
        <td>回収品目名</td>
        <td>{{ name }}</td>
      </tr>
      <tr>
        <td>回収品目名カナ</td>
        <td>{{ nameKana }}</td>
      </tr>
      <tr>
        <td>略称</td>
        <td>{{ abbr }}</td>
      </tr>
      <tr>
        <td>廃棄物区分</td>
        <td>
          {{ $WASTE_DIV[wasteDiv] }}
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
