const { getFirestore } = require('firebase-admin/firestore')
const firestore = getFirestore()

/**
 * 従属ドキュメントのマスタデータの内容を更新します。
 * pathで指定されたコレクション内のドキュメントの内、指定されたfieldの
 * docIdがdata.docIdと一致するドキュメントについて、fieidの内容をdataに更新します。
 * @param {string} path
 * @param {string} field
 * @param {object} data
 * @returns
 */
const syncData = async (path, field, data) => {
  const colRef = firestore.collection(path)
  const q = colRef.where(`${field}.docId`, '==', data.docId)
  const snapshot = await q.get()
  if (snapshot.empty) return
  const promises = []
  snapshot.forEach((doc) => {
    promises.push(doc.ref.update({ [field]: data }))
  })
}

/**
 * ### deleteCollections
 * collections配列で指定されたコレクション内のドキュメントを全て削除します。
 * rootPathを指定することで、特定のコレクション内のサブコレクションに限定することができます
 * @param {array} collections
 * @param {string} rootPath
 * @returns
 */
const deleteCollections = async (collections, rootPath = '/') => {
  if (!collections) return
  if (!Array.isArray(collections) || !collections.length) return
  const promises = []
  collections.forEach((collection) => {
    const path =
      rootPath === '/' ? `${collection}` : `${rootPath}/${collection}`
    promises.push(deleteAllDocuments(path))
  })
  await Promise.all(promises)
}

/**
 * ### deleteAllDocuments
 * pathで指定されたコレクション内のすべてのドキュメントを削除します。
 * @param {*} path 削除対象のドキュメントが含まれるコレクションのパス
 * @returns
 */
const deleteAllDocuments = async (path) => {
  const colRef = firestore.collection(path)
  const snapshot = await colRef.get()
  if (snapshot.empty) return
  const promises = []
  snapshot.docs.forEach((doc) => {
    promises.push(doc.ref.delete())
  })
  await Promise.all(promises)
}

exports.deleteAllDocuments = deleteAllDocuments
exports.deleteCollections = deleteCollections
exports.syncData = syncData
