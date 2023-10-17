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
export default {
  data() {
    return {
      collections: [
        {
          text: 'Customers',
          value: 'Customers',
          isAutonumber: true,
          autonumberFields: {
            field: 'code',
            length: 5,
          },
        },
        {
          text: 'Sites',
          value: 'Sites',
          isAutonumber: true,
          autonumberFields: {
            field: 'code',
            length: 8,
          },
        },
        {
          text: 'Items',
          value: 'Items',
          isAutonumber: false,
          autonumberFields: {},
        },
        {
          text: 'Items',
          value: 'Units',
          isAutonumber: false,
          autonumberFields: {},
        },
      ],
      systemCollections: ['Autonumbers', 'admin_users', 'developper_users'],
      loading: false,
    }
  },
  computed: {
    administratorUids() {
      return [this.$auth.currentUser.uid]
    },
    developerUids() {
      return [this.$auth.currentUser.uid]
    },
  },
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
        if (collection.isAutonumber) {
          const model = this.$Autonumber()
          model.initialize({
            ...collection.autonumberFields,
            collectionName: collection.value,
          })
          promises.push(model.create())
        }
      })
      await Promise.all(promises)
    },
    async deleteCollections() {
      const promises = []
      this.collections.forEach((collection) => {
        promises.push(this.deleteAllDocuments(collection.value))
      })
      this.systemCollections.forEach((collection) => {
        promises.push(this.deleteAllDocuments(collection))
      })
      await Promise.all(promises)
    },
    async deleteAllDocuments(path) {
      const colRef = collection(this.$firestore, path)
      const snapshot = await getDocs(colRef)
      if (snapshot.empty) return
      const promises = snapshot.docs.map((doc) => {
        return deleteDoc(doc.ref)
      })
      await Promise.all(promises)
    },
  },
}
</script>

<style></style>
