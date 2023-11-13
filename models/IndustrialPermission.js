/**
 * ### IndustrialPermission
 *
 * @author shisyamo4131
 */
import FireModel from './FireModel'

export default class IndustrialPermission extends FireModel {
  constructor(context) {
    super(context.app.$firestore, 'IndustrialPermissions', context.app.$auth)
  }

  initialize(item) {
    this.prefCode = ''
    this.permitNumber = ''
    this.processingDiv = 'delivery'
    this.includeSpeciallyControled = false
    this.dateOfPermission = ''
    this.dateOfExpiration = ''
    super.initialize(item)
  }
}
