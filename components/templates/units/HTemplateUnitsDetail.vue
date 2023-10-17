<script>
/**
 * @create 2023-10-06
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
   * MOUNTED
   ******************************************************************/
  mounted() {},
  /******************************************************************
   * DESTROYED
   ******************************************************************/
  destroyed() {},
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {},
}
</script>

<template>
  <air-template-tabs
    :label="model.abbr"
    :tabs="tabs"
    :tabs-props="{ grow: true }"
  >
    <template #prepend-label>
      <v-btn icon @click="$router.push(`/units`)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </template>
    <template #append-label>
      <v-btn icon @click="$router.push(`/items/${model.docId}/edit`)">
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
                <td>CODE</td>
                <td>{{ model.code }}</td>
              </tr>
              <tr>
                <td>単位</td>
                <td>{{ model.name }}</td>
              </tr>
              <tr>
                <td>略称</td>
                <td>{{ model.abbr }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-container>
    </template>
  </air-template-tabs>
</template>

<style></style>
