const { getDatabase } = require('firebase-admin/database')
const database = getDatabase()
const indexPath = 'Indexes'
/**
 * 指定されたコレクションのインデックス用データをRealtime Databaseに記録します。
 * データツリーのkeyはdata.docIdが使用されます。
 * @param {string} collection
 * @param {object} data
 * @param {array} fields
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
}

/**
 * 指定されたコレクションのインデックス用データをRealtime Databaseから削除します。
 * @param {string} collection
 * @param {string} docId
 */
const deleteIndex = async (collection, docId) => {
  const dbRef = database.ref(`${indexPath}/${collection}/${docId}`)
  await dbRef.remove()
}

exports.createIndex = createIndex
exports.deleteIndex = deleteIndex
