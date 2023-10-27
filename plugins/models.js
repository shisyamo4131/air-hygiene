import Autonumber from '../models/Autonumber'
import IndustrialPermission from '../models/IndustrialPermission'
import MunicipalPermission from '../models/MunicipalPermission'
import CollectItem from '../models/CollectItem'
import Unit from '../models/Unit'
import Customer from '../models/Customer'
import Site from '../models/Site'
import SiteMunicipalContract from '../models/SiteMunicipalContract'
import SiteUnitPrice from '../models/SiteUnitPrice'
import ItemUnitPrice from '../models/ItemUnitPrice'
import CollectionResult from '../models/CollectionResult'
import CollectionResultDetail from '../models/CollectionResultDetail'

export default (context, inject) => {
  inject('Autonumber', () => new Autonumber(context))
  inject('IndustrialPermission', () => new IndustrialPermission(context))
  inject('MunicipalPermission', () => new MunicipalPermission(context))
  inject('CollectItem', () => new CollectItem(context))
  inject('Unit', () => new Unit(context))
  inject('Customer', () => new Customer(context))
  inject('Site', () => new Site(context))
  inject(
    'SiteMunicipalContract',
    (docId) => new SiteMunicipalContract(context, docId)
  )
  inject('SiteUnitPrice', (docId) => new SiteUnitPrice(context, docId))
  inject('ItemUnitPrice', (item) => new ItemUnitPrice(item))
  inject('CollectionResult', () => new CollectionResult(context))
  inject(
    'CollectionResultDetail',
    (siteId, date) => new CollectionResultDetail(context, siteId, date)
  )
}
