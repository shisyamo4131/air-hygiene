<script>
/**
 * ### HSimpleTableRoot
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
    status: { type: String, default: '', required: false },
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
        <td>回収ルート名</td>
        <td>{{ name }}</td>
      </tr>
      <tr>
        <td>状態</td>
        <td>
          {{ $ROOT_STATUS[status] }}
        </td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<style></style>
