/**
 * ### SiteMunicipalContract
 *
 * A data model of SiteMunicipalContract
 *
 * #### PROPERTIES
 * | name      | type   | default | required | remarks                       |
 * | :-------- | :----- | ------- | :------: | :---------------------------- |
 * | siteId    | string | ''      | true     |                               |
 * | date      | string | ''      | true     |                               |
 * | unitPrice | number | null    | false    |                               |
 * | average   | number | null    | false    |                               |
 * | frequency | number | null    | false    |                               |
 * | preMethod | string | ''      | false    | [ 'licensed', 'city', 'non' ] |
 * | prefCode  | string | ''      | true     |                               |
 * | cityCode  | string | ''      | true     |                               |
 * | remarks   | string | ''      | false    |                               |
 *
 * @author shisyamo4131
 */
import FireModel from './FireModel'

export default class SiteMunicipalContract extends FireModel {
  constructor(context) {
    super(context.app.$firestore, `SiteMunicipalContracts`, context.app.$auth)
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
    this.siteId = ''
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
