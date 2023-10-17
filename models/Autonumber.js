/**
 * Autonumber
 * @create 2023-09-29
 * @author shisyamo4131
 */
import FireModel from './FireModel'

export default class Autonumber extends FireModel {
  constructor(context) {
    super(context.app.$firestore, 'Autonumbers', context.app.$auth)
  }

  initialize(item) {
    this.collectionName = ''
    this.current = 0
    this.length = 1
    this.field = ''
    this.condition = true
    super.initialize(item)
  }

  async create() {
    await super.create(this.collectionName)
  }
}
