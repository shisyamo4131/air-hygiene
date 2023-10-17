/**
 * ページ（URL）毎のPermissionを設定
 * ルート以下のURLを、スラッシュをハイフンに書き換えた文字列をkeyとし、
 * 当該URLへのPermissionを配列で指定する。
 * 配列の要素は文字列で、Authenticationsのroleに設定されるものを使用する。
 * ※roleの設定はCloud Functions
 * 配列が空の場合はすべて許可される。
 */
export const pagePermissions = {
  customers: [],
  'customers-id': [],
  'customers-id-edit': [],
  'customers-regist': [],
  items: [],
  'items-id': [],
  'items-id-edit': [],
  'items-regist': [],
  'industrial-permissions': [],
  'industrial-permissions-id': [],
  'industrial-permissions-id-edit': [],
  'industrial-permissions-regist': [],
  'municipal-permissions': [],
  'municipal-permissions-id': [],
  'municipal-permissions-id-edit': [],
  'municipal-permissions-regist': [],
  sites: [],
  'sites-id': [],
  'sites-id-edit': [],
  'sites-regist': [],
  units: [],
  'units-id': [],
  'units-id-edit': [],
  'units-regist': [],
  'administrators-autonumbers': ['admin', 'developer'],
  'administrators-initialize': ['admin', 'developer'],
  'administrators-initialize-collection': ['admin', 'developer'],
  'developments-sandbox': ['developer'],
  'developments-input-test': ['developer'],
}
