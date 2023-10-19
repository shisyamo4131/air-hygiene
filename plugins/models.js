import Autonumber from '../models/Autonumber'
import IndustrialPermission from '../models/IndustrialPermission'
import MunicipalPermission from '../models/MunicipalPermission'
import Item from '../models/Item'
import Unit from '../models/Unit'
import Customer from '../models/Customer'
import Site from '../models/Site'
import MunicipalContract from '../models/MunicipalContract'
import UnitPrice from '../models/UnitPrice'
import ItemUnitPrice from '../models/ItemUnitPrice'

export default (context, inject) => {
  inject('Autonumber', () => new Autonumber(context))
  inject('IndustrialPermission', () => new IndustrialPermission(context))
  inject('MunicipalPermission', () => new MunicipalPermission(context))
  inject('Item', () => new Item(context))
  inject('Unit', () => new Unit(context))
  inject('Customer', () => new Customer(context))
  inject('Site', () => new Site(context))
  inject('MunicipalContract', (docId) => new MunicipalContract(context, docId))
  inject('UnitPrice', (docId) => new UnitPrice(context, docId))
  inject('ItemUnitPrice', (item) => new ItemUnitPrice(item))
}
