/**
 * IndustrialPermission
 * @create 2023-10-02
 * @author shisyamo4131
 */
import FireModel from './FireModel'

export default class IndustrialPermission extends FireModel {
  constructor(context) {
    super(context.app.$firestore, 'IndustrialPermissions', context.app.$auth)
    Object.defineProperties(this, {
      area: {
        enumerable: true,
        get() {
          if (!this.prefecture) return ''
          return `${this.prefecture.name}`
        },
        set(v) {},
      },
    })
  }

  initialize(item) {
    this.prefecture = null
    this.permitNumber = ''
    this.processingDiv = 'delivery'
    this.includeSpeciallyControled = false
    this.dateOfPermission = ''
    this.dateOfExpiration = ''
    super.initialize(item)
  }
}
