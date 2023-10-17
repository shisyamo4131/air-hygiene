/**
 * MunicipalPermission
 * @create 2023-10-02
 * @author shisyamo4131
 */
import FireModel from './FireModel'

export default class MunicipalPermission extends FireModel {
  constructor(context) {
    super(context.app.$firestore, 'MunicipalPermissions', context.app.$auth)
    Object.defineProperties(this, {
      area: {
        enumerable: true,
        get() {
          if (!this.city) return ''
          return `${this.city.prefecture}${this.city.name}`
        },
        set(v) {},
      },
    })
  }

  initialize(item) {
    this.prefCode = ''
    this.city = null
    this.processingDiv = 'delivery'
    this.includeSpeciallyControled = false
    this.dateOfPermission = ''
    this.dateOfExpiration = ''
    super.initialize(item)
  }
}
