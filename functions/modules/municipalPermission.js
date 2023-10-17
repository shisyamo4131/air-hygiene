/**
 * MunicipalPermissions（Firestore）
 * @create 2023-10-02
 * @author shisyamo4131
 */
const { getDatabase } = require('firebase-admin/database')
const {
  onDocumentCreated,
  onDocumentDeleted,
  onDocumentUpdated,
} = require('firebase-functions/v2/firestore')
const database = getDatabase()

exports.created = onDocumentCreated(
  'MunicipalPermissions/{permissionId}',
  async (event) => {
    const permissionId = event.params.permissionId
    const data = event.data.data()
    await syncDatabase(permissionId, data)
  }
)

exports.updated = onDocumentUpdated(
  'MunicipalPermissions/{permissionId}',
  async (event) => {
    const permissionId = event.params.permissionId
    const data = event.data.after.data()
    await syncDatabase(permissionId, data)
  }
)

exports.deleted = onDocumentDeleted(
  'MunicipalPermissions/{permissionId}',
  async (event) => {
    const permissionId = event.params.permissionId
    await syncDatabase(permissionId)
  }
)

/**
 * Realtime Databaseに同期します。
 * @param {*} permissionId
 * @param {object} data Firestoreドキュメントのdata
 */
async function syncDatabase(permissionId, data = undefined) {
  /* For index page */
  const indexPage = data
    ? {
        docId: data.docId,
        area: data.area,
        areaCode: data.city.code,
        processingDiv: data.processingDiv,
        dateOfExpiration: data.dateOfExpiration,
      }
    : null
  const updates = {}
  updates[`/IndexPages/MunicipalPermissions/${permissionId}`] = indexPage
  await database.ref().update(updates)
}
