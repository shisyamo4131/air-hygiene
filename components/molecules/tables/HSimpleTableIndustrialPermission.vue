<script>
/**
 * ### ASimpleTableIndustrialPermission
 *
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    prefCode: { type: String, default: '', required: false },
    permitNumber: { type: String, default: '', required: false },
    processingDiv: {
      type: String,
      default: 'delivery',
      validator: (v) => ['delivery', 'disposal'].includes(v),
      required: false,
    },
    includeSpeciallyControled: {
      type: Boolean,
      default: false,
      required: false,
    },
    dateOfPermission: { type: String, default: '', required: false },
    dateOfExpiration: { type: String, default: '', required: false },
  },
}
</script>

<template>
  <v-simple-table>
    <tbody>
      <tr>
        <td>都道府県</td>
        <td>{{ $PREFECTURE[prefCode] }}</td>
      </tr>
      <tr>
        <td>許可番号</td>
        <td>{{ permitNumber }}</td>
      </tr>
      <tr>
        <td>処理区分</td>
        <td>{{ $PROCESSING_DIV[processingDiv] }}</td>
      </tr>
      <tr>
        <td>特別管理廃棄物</td>
        <td>{{ `${includeSpeciallyControled ? 'はい' : 'いいえ'}` }}</td>
      </tr>
      <tr>
        <td>許可日</td>
        <td>{{ dateOfPermission }}</td>
      </tr>
      <tr>
        <td>有効期限</td>
        <td>{{ dateOfExpiration }}</td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<style></style>
