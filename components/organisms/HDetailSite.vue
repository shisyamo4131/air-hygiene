<script>
/**
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    /* requires this.$Site() */
    model: { type: Object, required: true },
  },
}
</script>

<template>
  <v-card outlined>
    <v-simple-table class="default">
      <tbody>
        <tr>
          <td>CODE</td>
          <td>{{ model.code }}</td>
        </tr>
        <tr>
          <td>排出場所名</td>
          <td>{{ model.name }}</td>
        </tr>
        <tr>
          <td>略称</td>
          <td>
            <div class="text-caption grey--text text--lighten-1">
              {{ model.abbrKana }}
            </div>
            <div>{{ model.abbr }}</div>
          </td>
        </tr>
        <tr>
          <td>住所</td>
          <td>{{ `${model.address1} ${model.address2}` }}</td>
        </tr>
        <tr>
          <td>TEL/FAX</td>
          <td>{{ `${model.tel} / ${model.fax}` }}</td>
        </tr>
        <tr>
          <td>URL</td>
          <td>{{ model.url }}</td>
        </tr>
        <tr>
          <td>担当者</td>
          <td>
            {{ model.staffName }}
            <span v-if="model.staffEmail">({{ model.staffEmail }})</span>
          </td>
        </tr>
        <tr>
          <td>状態</td>
          <td>
            {{ $CUSTOMER_CONDITION[model.condition] }}
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-divider v-if="model.remarks" />
    <v-card-text v-if="model.remarks">
      {{ model.remarks }}
    </v-card-text>
  </v-card>
</template>

<style></style>
