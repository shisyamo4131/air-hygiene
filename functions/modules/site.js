/**
 * ### 同期先
 * - CollectionResults
 * @author shisyamo4131
 */
const {
  onDocumentDeleted,
  onDocumentUpdated,
} = require('firebase-functions/v2/firestore')
const { deleteCollections, syncData } = require('./firestore')

/* Define relations */
const relations = ['SiteUnitPrices', 'SiteMunicipalContracts']

exports.updated = onDocumentUpdated('Sites/{siteId}', async (event) => {
  const data = event.data.after.data()
  const promises = [syncData(`CollectionResults`, 'site', data)]
  await Promise.all(promises)
})

exports.deleted = onDocumentDeleted('Sites/{siteId}', async (event) => {
  // const siteId = event.params.siteId
  const promises = [deleteCollections(relations)]
  await Promise.all(promises)
})
