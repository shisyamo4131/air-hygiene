/**
 * ### マスタデータ用Vuex
 *
 * #### ACTIONS
 * ##### subscribe
 * 各種マスタデータのリアルタイムリスナーをセットします。
 * 全てのマスタデータへのリスナーがセットされるとpromiseを返します。
 *
 * ##### unsubscribe
 * 各種マスタデータのリアルタイムリスナーを解除し、Vuexで管理している
 * マスタデータを初期化します。
 * 処理がすべて終わるとpromiseを返します。
 *
 * @author shisyamo4131
 */
/* eslint-disable */

import { collection, onSnapshot } from 'firebase/firestore'

const MODULE_NAME = '[Vuex masters.js]'

/******************************************************************
 * STATE
 ******************************************************************/
export const state = () => ({
  CollectItems: [],
  Units: [],
  listeners: {
    CollectItems: null,
    Units: null,
  },
})
/******************************************************************
 * GETTERS
 ******************************************************************/
export const getters = {
  CollectItem: (state) => (payload) => {
    return state.CollectItems.find(({ docId }) => docId === payload)
  },
  Unit: (state) => (payload) => {
    return state.Units.find(({ docId }) => docId === payload)
  },
}
/******************************************************************
 * MUTATIONS
 ******************************************************************/
export const mutations = {
  addMaster(state, { collection, data }) {
    if (!collection || !data) return
    const items = state[collection]
    const index = items.findIndex(({ docId }) => docId === data.docId)
    if (index === -1) items.push(data)
    if (index !== -1) items.splice(index, 1, data)
  },
  removeMaster(state, { collection, data }) {
    if (!collection || !data) return
    const items = state[collection]
    const index = items.findIndex(({ docId }) => docId === data.docId)
    if (index !== -1) items.splice(index, 1)
  },
  addListener(state, { collection, listener }) {
    if (!collection || !listener) {
      throw new Error(
        `[Vuex masters.js] Parameter 'collection' and 'listeners' must be specified.`
      )
    }
    if (!(collection in state.listeners)) {
      throw new Error(
        `[Vuex masters.js] The ${collection} collection does not exist.`
      )
    }
    state.listeners[collection] = listener
  },
  removeListener(state, collection) {
    if (!collection) {
      throw new Error(
        `[Vuex masters.js] Parameter 'collection' must be specified.`
      )
    }
    if (!(collection in state.listeners)) {
      throw new Error(
        `[Vuex masters.js] The ${collection} collection does not exist.`
      )
    }
    Object.keys(state.listeners).forEach((key) => {
      if (state.listeners[key]) state.listeners[key]()
      state[key].splice(0)
    })
  },
}
/******************************************************************
 * ACTIONS
 ******************************************************************/
export const actions = {
  subscribe({ state, commit }) {
    return new Promise((resolve, reject) => {
      try {
        Object.keys(state.listeners).forEach((key) => {
          const colRef = collection(this.$firestore, key)
          const listener = onSnapshot(colRef, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              const type = change.type
              const data = change.doc.data()
              if (type === 'added')
                commit('addMaster', { collection: key, data })
              if (type === 'modified')
                commit('addMaster', { collection: key, data })
              if (type === 'removed')
                commit('removeMaster', { collection: key, data })
            })
          })
          console.info(
            `${MODULE_NAME} %sコレクションに対するリアルタイムリスナーをセットしました。`,
            key
          )
          commit('addListener', { collection: key, listener })
        })
        resolve()
      } catch (err) {
        sendError(err)
        reject(err.message)
      }
    })
  },
  unsubscribe({ state, commit }) {
    const MESSAGE = '%sコレクションに対するリアルタイムリスナーを解除しました。'
    return new Promise((resolve, reject) => {
      try {
        Object.keys(state.listeners).forEach((key) => {
          commit('removeListener', key)
          console.info(`${MODULE_NAME} ${MESSAGE}`, key)
        })
        resolve()
      } catch (err) {
        sendError(err)
        reject(err)
      }
    })
  },
}
/* eslint-enable */

function sendError(err) {
  // eslint-disable-next-line
  console.error(err)
  alert(err.message)
}
