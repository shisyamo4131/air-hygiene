/**
 * ### 同期先
 * - Sites
 * @author shisyamo4131
 */
const {
  onDocumentDeleted,
  onDocumentUpdated,
} = require('firebase-functions/v2/firestore')
const { deleteCollections, syncData } = require('./firestore')

/* Define relations */
const relations = []

exports.updated = onDocumentUpdated('Customers/{customerId}', async (event) => {
  const data = event.data.after.data()
  const promises = [syncData(`Sites`, 'customer', data)]
  await Promise.all(promises)
})

exports.deleted = onDocumentDeleted('Customers/{customerId}', async (event) => {
  // const customerId = event.params.customerId
  const promises = [deleteCollections(relations)]
  await Promise.all(promises)
})
