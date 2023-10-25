import { onChildAdded, onChildChanged, onChildRemoved } from 'firebase/database'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

const airCalcDeadlineDate = (context, date, deadline) => {
  if (!date) {
    // eslint-disable-next-line
    console.error(`[air-util.js] Missing parameter date.`)
    return ''
  }
  let result = context.app.$dayjs(date)
  if (date !== result.format('YYYY-MM-DD')) {
    // eslint-disable-next-line
    console.error(`[air-util.js] Invalid date.`)
    return ''
  }
  if (deadline === '99') {
    result = context.app.$dayjs(date).endOf('month')
  } else {
    result = context.app.$dayjs(`${date.substr(0, 8)}${deadline}`)
  }
  if (date > result.format('YYYY-MM-DD')) result = result.add(1, 'month')
  return result.format('YYYY-MM-DD')
}

/**
 * onChildAdded、onChildChanged、onChildRemovedを利用した
 * Realtime Databaseへのsubscribeを行います。
 * 取得したデータ配列としてitemsを、Listenerをデタッチするための
 * unsubscribe()を返します。
 * @param {*} query onChild***に引き渡すqueryです。
 * @returns {{ items: Array, unsubscribe: Function}} itemsは取得したドキュメントの配列、unsubscribeはリスナーをデタッチするための関数
 * @returns
 */
const airSubscribeDatabase = (query) => {
  const unsubscribes = {
    added: null,
    changed: null,
    removed: null,
  }
  const items = []
  unsubscribes.added = onChildAdded(query, (snapshot) => {
    const index = items.findIndex(({ docId }) => docId === snapshot.key)
    if (index === -1) items.push(snapshot.val())
    if (index !== -1) items.splice(index, 1, snapshot.val())
  })
  unsubscribes.changed = onChildChanged(query, (snapshot) => {
    const index = items.findIndex(({ docId }) => docId === snapshot.key)
    if (index === -1) items.push(snapshot.val())
    if (index !== -1) items.splice(index, 1, snapshot.val())
  })
  unsubscribes.removed = onChildRemoved(query, (snapshot) => {
    const index = items.findIndex(({ docId }) => docId === snapshot.key)
    if (index !== -1) items.splice(index, 1)
  })
  const unsubscribe = () => {
    Object.keys(unsubscribes).forEach((key) => {
      if (unsubscribes[key]) unsubscribes[key]()
    })
  }
  return { items, unsubscribe }
}

/**
 * onSnapshotを利用したFirestoreコレクションへのsubscribeを行います。
 * @param {*} query onSnapshotに引き渡すqueryです。
 * @returns {{ items: Array, unsubscribe: Function}} itemsは取得したドキュメントの配列、unsubscribeはリスナーをデタッチするための関数
 */
const airSubscribeFirestore = (query) => {
  const items = []
  const unsub = onSnapshot(query, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const item = change.doc.data()
      const index = items.findIndex(({ docId }) => docId === item.docId)
      if (change.type === 'added') items.push(item)
      if (change.type === 'modified') items.splice(index, 1, item)
      if (change.type === 'removed') items.splice(index, 1)
    })
  })
  const unsubscribe = () => {
    if (unsub) unsub()
  }
  return { items, unsubscribe }
}

/**
 * tokenMapを利用したFirestoreのonSnapshotリスナーを作成し、
 * データ配列（items）とデタッチするための関数（unsubscribe）を返します。
 * @param {*} firestore
 * @param {*} search
 * @param {*} colName
 * @returns
 */
const airSubscribeFirestoreByTokenMap = (firestore, search, colName) => {
  const items = []
  const gramLength = search.length === 1 ? 1 : 2
  const searchGram = []
  for (let i = 0; i <= search.length - gramLength; i++) {
    searchGram.push(search.substring(i, i + gramLength).toLowerCase())
  }
  const colRef = collection(firestore, colName)
  const wheres = searchGram.map((gram) => where(`tokenMap.${gram}`, '==', true))
  const q = query(colRef, ...wheres)
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const item = { docId: change.doc.id, ...change.doc.data() }
      const index = items.findIndex(({ docId }) => docId === change.doc.id)
      if (change.type === 'added') items.push(item)
      if (change.type === 'modified') items.splice(index, 1, item)
      if (change.type === 'removed') items.splice(index, 1)
    })
  })
  return { items, unsubscribe }
}

export default (context, inject) => {
  inject('airCalcDeadlineDate', (date, deadline) =>
    airCalcDeadlineDate(context, date, deadline)
  )
  inject('airSubscribeDatabase', (query) => airSubscribeDatabase(query))
  inject('airSubscribeFirestore', (query) => airSubscribeFirestore(query))
  inject('airSubscribeFirestoreByTokenMap', (search, colName) =>
    airSubscribeFirestoreByTokenMap(context.app.$firestore, search, colName)
  )
}
