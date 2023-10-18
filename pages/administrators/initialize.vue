<template>
  <air-template-default label="システム初期化">
    <v-container fluid>
      <v-card outlined>
        <v-card-title>システムを初期化します。</v-card-title>
        <v-card-text>
          システムを初期化するとすべてデータが削除されます。
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            color="error"
            :disabled="loading"
            :loading="loading"
            @click="initialize()"
            >実行</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-container>
  </air-template-default>
</template>

<script>
/**
 * サブコレクションについてはCloud Functionsで対応。
 */
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore'
import setting from '~/assets/setting.json'
export default {
  /******************************************************************
   * DATA
   ******************************************************************/
  data() {
    return {
      collections: setting.collections,
      systemCollections: setting.systemCollections,
      loading: false,
    }
  },
  /******************************************************************
   * COMPUTED
   ******************************************************************/
  computed: {
    administratorUids() {
      return [this.$auth.currentUser.uid]
    },
    developerUids() {
      return [this.$auth.currentUser.uid]
    },
  },
  /******************************************************************
   * METHODS
   ******************************************************************/
  methods: {
    async initialize() {
      try {
        this.loading = true
        await this.deleteCollections()
        await this.initAdministratorRoles()
        await this.initDeveloperRoles()
        await this.initAutonumbers()
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.loading = false
      }
    },
    async initAdministratorRoles() {
      const promises = this.administratorUids.map((uid) => {
        const docRef = doc(this.$firestore, `admin_users/${uid}`)
        return setDoc(docRef, { uid })
      })
      await Promise.all(promises)
    },
    async initDeveloperRoles() {
      const promises = this.developerUids.map((uid) => {
        const docRef = doc(this.$firestore, `developer_users/${uid}`)
        return setDoc(docRef, { uid })
      })
      await Promise.all(promises)
    },
    async initAutonumbers() {
      const promises = []
      this.collections.forEach((collection) => {
        if (collection.autonumber.condition) {
          const model = this.$Autonumber()
          model.initialize({
            ...collection.autonumber,
            collectionName: collection.name,
          })
          promises.push(model.create())
        }
      })
      await Promise.all(promises)
    },
    async deleteCollections() {
      const promises = []
      this.collections.forEach((collection) => {
        promises.push(this.deleteAllDocuments(collection.name))
      })
      this.systemCollections.forEach((collection) => {
        promises.push(this.deleteAllDocuments(collection))
      })
      await Promise.all(promises)
    },
    async deleteAllDocuments(path) {
      /* eslint-disable */
      try {
        const colRef = collection(this.$firestore, path)
        const snapshot = await getDocs(colRef)
        if (snapshot.empty) return
        const promises = snapshot.docs.map((doc) => {
          return deleteDoc(doc.ref)
        })
        await Promise.all(promises)
      } catch (err) {
        console.error(err)
        alert(err.message)
      }
      /* eslint-enable */
    },
  },
}
</script>

<style></style>
