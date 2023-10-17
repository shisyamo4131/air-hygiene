/**
 * MunicipalContract
 * @create 2023-10-07
 * @author shisyamo4131
 */
import FireModel from './FireModel'

export default class MunicipalContract extends FireModel {
  constructor(context, docId) {
    super(
      context.app.$firestore,
      `Sites/${docId}/MunicipalContracts`,
      context.app.$auth
    )
    Object.defineProperties(this, {
      siteId: {
        enumerable: true,
        get() {
          return this.docId
        },
        set(v) {},
      },
    })
  }

  initialize(item) {
    this.date = ''
    this.unitPrice = null
    this.average = null
    this.frequency = null
    this.preMethod = ''
    this.prefCode = ''
    this.cityCode = ''
    this.remarks = ''
    super.initialize(item)
  }
}
