<script>
/**
 * ### HSimpleTableCollectItem
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
    abbr: { type: String, default: '', required: false },
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
        <td>単位</td>
        <td>{{ name }}</td>
      </tr>
      <tr>
        <td>略称</td>
        <td>{{ abbr }}</td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<style></style>
