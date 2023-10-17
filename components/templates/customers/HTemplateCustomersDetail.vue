<script>
/**
 * @create 2023-09-26
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
  computed: {
    sites() {
      return this.$store.state.masters.Sites.filter(
        ({ customer }) => customer.docId === this.model.docId
      )
    },
  },
}
</script>

<template>
  <air-template-tabs
    :label="model.abbr"
    :tabs="tabs"
    :tabs-props="{ grow: true }"
  >
    <template #prepend-label>
      <v-btn icon @click="$router.push(`/customers`)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </template>
    <template #append-label>
      <v-btn icon @click="$router.push(`/customers/${model.docId}/edit`)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <template #tab-0>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-card outlined>
              <v-card-title>{{ model.name1 }}</v-card-title>
              <v-card-subtitle>{{ model.name2 }}</v-card-subtitle>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3">
            <v-card outlined class="mt-4">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-2">
                    排出場所
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-sheet
                    class="rounded d-flex justify-center"
                    width="36"
                    height="36"
                    color="primary"
                  >
                    <v-icon>mdi-truck-fast</v-icon>
                  </v-sheet>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="d-flex justify-end">
                    <div>
                      <span class="text-h6">{{ sites.length }}</span>
                      件
                    </div>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
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
                <td>取引先名1</td>
                <td>{{ model.name1 }}</td>
              </tr>
              <tr>
                <td>取引先名2</td>
                <td>{{ model.name2 }}</td>
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
                <td>敬称</td>
                <td>{{ model.honor }}</td>
              </tr>
              <tr>
                <td>締日/入金サイト</td>
                <td>
                  {{
                    `${$DEADLINE[model.deadline]}締め / ${
                      model.depositMonth
                    }ヶ月後${$DEADLINE[model.depositDay]}`
                  }}
                </td>
              </tr>
              <tr>
                <td>端数処理</td>
                <td>
                  {{ $ROUNDING[model.rounding] }}
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
      </v-container>
    </template>
  </air-template-tabs>
</template>

<style></style>
