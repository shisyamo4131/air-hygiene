<script>
/**
 * @create 2023-10-02
 * @author shisyamo4131
 */
export default {
  /******************************************************************
   * PROPS
   ******************************************************************/
  props: {
    model: { type: Object, required: true },
  },
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      tabs: ['Dashboard', '登録情報'],
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {},
}
</script>

<template>
  <air-template-tabs
    :label="`産業廃棄物処理業許可【${model.area}】`"
    :tabs="tabs"
    :tabs-props="{ grow: true }"
  >
    <template #prepend-label>
      <v-btn icon @click="$router.push(`/industrial-permissions`)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </template>
    <template #append-label>
      <v-btn
        icon
        @click="$router.push(`/industrial-permissions/${model.docId}/edit`)"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <template #tab-0>
      <v-container>
        <v-card outlined>
          <v-card-title>現場情報？</v-card-title>
        </v-card>
      </v-container>
    </template>
    <template #tab-1>
      <v-container>
        <v-card outlined>
          <v-simple-table>
            <tbody>
              <tr>
                <td>許可エリア</td>
                <td>{{ model.area }}</td>
              </tr>
              <tr>
                <td>許可番号</td>
                <td>{{ model.permitNumber }}</td>
              </tr>
              <tr>
                <td>処理区分</td>
                <td>{{ $PROCESSING_DIV[model.processingDiv] }}</td>
              </tr>
              <tr>
                <td>特別管理を含む</td>
                <td>{{ model.speciallyControled ? 'はい' : 'いいえ' }}</td>
              </tr>
              <tr>
                <td>許可日</td>
                <td>{{ model.dateOfPermission }}</td>
              </tr>
              <tr>
                <td>有効期限</td>
                <td>{{ model.dateOfExpiration }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-container>
    </template>
  </air-template-tabs>
</template>

<style></style>
