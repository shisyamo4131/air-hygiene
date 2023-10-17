/**
 * Sites（Firestore）
 * @create 2023-10-12
 * @author shisyamo4131
 */
const {
  onDocumentDeleted,
  onDocumentUpdated,
} = require('firebase-functions/v2/firestore')
const { deleteCollections, syncData } = require('./firestore')

/* Define subcollections */
const subcollections = ['MunicipalContracts']

exports.updated = onDocumentUpdated('Sites/{siteId}', async (event) => {
  const data = event.data.after.data()
  const promises = [syncData(`Sites`, 'site', data)]
  await Promise.all(promises)
})

exports.deleted = onDocumentDeleted('Sites/{siteId}', async (event) => {
  const siteId = event.params.siteId
  const promises = [deleteCollections(subcollections, `Sites/${siteId}`)]
  await Promise.all(promises)
})
