const { getDatabase } = require('firebase-admin/database')
const { logger } = require('firebase-functions/v2')
const database = getDatabase()
const indexPath = ''
/**
 * ### createIndex
 * Realtime Databaseにインデックス用データを作成します。
 * データツリーのkeyはdata.docIdが使用されます。
 * #### fields
 * 引数fieldsは以下の仕様に合わせた配列である必要があります。
 * ```
 * { name, value }
 * ```
 * @param {string} collection Firestoreにおけるコレクション名
 * @param {object} data トリガーで取得したドキュメントのデータオブジェクト
 * @param {array} fields インデックスとして記録するデータのフィールド名を含む配列
 */
const createIndex = async (collection, data, fields) => {
  /* ネストされたプロパティを取得する可能性を考慮 */
  const getProperty = (path) => {
    let result = data
    const propsArray = path.split('.')
    for (let i = 0; i <= propsArray.length - 1; i += 1) {
      if (propsArray[i] === '') return undefined
      if (typeof result[propsArray[i]] === 'undefined') return undefined
      result = result[propsArray[i]]
    }
    return result
  }
  const json = fields.reduce((acc, field) => {
    return { ...acc, [field.name]: getProperty(field.value) }
  }, {})
  const dbRef = database.ref(`${indexPath}/${collection}/${data.docId}`)
  await dbRef.set(json)
  logger.info(`[database.js] The index was successfully created.`)
  logger.info({ collection, data: json })
}

/**
 * ### deleteIndex
 * Realtime Databaseからインデックス用データを削除します。
 * @param {string} collection Firestoreにおけるコレクション名
 * @param {string} docId 削除対象のドキュメントID
 */
const deleteIndex = async (collection, docId) => {
  const dbRef = database.ref(`${indexPath}/${collection}/${docId}`)
  await dbRef.remove()
  logger.info(`[database.js] The index was successfully deleted.`)
  logger.info({ collection, docId })
}

exports.createIndex = createIndex
exports.deleteIndex = deleteIndex
