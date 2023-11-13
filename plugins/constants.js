import cities from '~/assets/cities.json'

/* 市区町村 */
const CITY_ARRAY = (prefCode) => {
  const result = cities.filter((city) => {
    return city.code.substring(0, 2) === prefCode
  })
  return result
}

const CITY = cities.reduce((acc, city) => {
  return { ...acc, [city.code]: city.name }
}, {})

/* 実績区分 */
const COLLECTION_RESULT_TYPE = {
  root: '1: ルート',
  spot: '2: スポット',
  monthly: '9: 月極',
}

const COLLECTION_RESULT_TYPE_ARRAY = [
  { value: 'root', text: '1: ルート' },
  { value: 'spot', text: '2: スポット' },
  { value: 'monthly', text: '9: 月極' },
]

/* 取引先状態 */
const CUSTOMER_STATUS = {
  active: '契約中',
  expired: '契約満了',
}

const CUSTOMER_STATUS_ARRAY = [
  { value: 'active', text: '契約中' },
  { value: 'expired', text: '契約満了' },
]

/* 締日（入金日） */
const DEADLINE = {
  '05': '5日',
  10: '10日',
  15: '15日',
  20: '20日',
  25: '25日',
  99: '末日',
}

const DEADLINE_ARRAY = [
  { value: '05', text: '5日' },
  { value: '10', text: '10日' },
  { value: '15', text: '15日' },
  { value: '20', text: '20日' },
  { value: '25', text: '25日' },
  { value: '99', text: '末日' },
]

/* 編集モード */
const EDIT_MODE = {
  REGIST: '追加',
  UPDATE: '変更',
  DELETE: '削除',
}

const EDIT_MODE_ARRAY = [
  { value: 'REGIST', text: '追加' },
  { value: 'UPDATE', text: '変更' },
  { value: 'DELETE', text: '削除' },
]

/* 一廃契約前収集形態 */
const PRE_METHOD = {
  licensed: '許可業者',
  city: '区収集',
  non: 'なし',
}

const PRE_METHOD_ARRAY = [
  { value: 'licensed', text: '許可業者' },
  { value: 'city', text: '区収集' },
  { value: 'non', text: 'なし' },
]

/* 都道府県 */
const PREFECTURE = {
  '01': '北海道',
  '02': '青森県',
  '03': '岩手県',
  '04': '宮城県',
  '05': '秋田県',
  '06': '山形県',
  '07': '福島県',
  '08': '茨城県',
  '09': '栃木県',
  10: '群馬県',
  11: '埼玉県',
  12: '千葉県',
  13: '東京都',
  14: '神奈川県',
  15: '新潟県',
  16: '富山県',
  17: '石川県',
  18: '福井県',
  19: '山梨県',
  20: '長野県',
  21: '岐阜県',
  22: '静岡県',
  23: '愛知県',
  24: '三重県',
  25: '滋賀県',
  26: '京都府',
  27: '大阪府',
  28: '兵庫県',
  29: '奈良県',
  30: '和歌山県',
  31: '鳥取県',
  32: '島根県',
  33: '岡山県',
  34: '広島県',
  35: '山口県',
  36: '徳島県',
  37: '香川県',
  38: '愛媛県',
  39: '高知県',
  40: '福岡県',
  41: '佐賀県',
  42: '長崎県',
  43: '熊本県',
  44: '大分県',
  45: '宮崎県',
  46: '鹿児島県',
  47: '沖縄県',
}

const PREFECTURE_ARRAY = () => {
  const result = []
  for (const [key, value] of Object.entries(PREFECTURE)) {
    result.push({ value: key, text: value })
  }
  return result.sort((a, b) => {
    if (a.value < b.value) return -1
    if (a.value > b.value) return 1
    return 0
  })
}

/* 処理区分 */
const PROCESSING_DIV = {
  delivery: '収集運搬',
  diposal: '処分',
}

const PROCESSING_DIV_ARRAY = [
  { value: 'delivery', text: '収集運搬' },
  { value: 'disposal', text: '処分' },
]

/* 端数処理 */
const ROUNDING = {
  floor: '切り捨て',
  round: '四捨五入',
  ceil: '切り上げ',
}

const ROUNDING_ARRAY = [
  { value: 'floor', text: '切り捨て' },
  { value: 'round', text: '四捨五入' },
  { value: 'ceil', text: '切り上げ' },
]

/* 排出場所状態 */
const SITE_STATUS = {
  active: '契約中',
  expired: '契約満了',
}

const SITE_STATUS_ARRAY = [
  { value: 'active', text: '契約中' },
  { value: 'expired', text: '契約満了' },
]

/* 廃棄物区分 */
const WASTE_DIV = {
  municipal: '1: 一般廃棄物',
  industrial: '2: 産業廃棄物',
  other: '9: その他',
}

const WASTE_DIV_ARRAY = [
  { value: 'municipal', text: '1: 一般廃棄物' },
  { value: 'industrial', text: '2: 産業廃棄物' },
  { value: 'other', text: '9: その他' },
]

export default (context, inject) => {
  inject('CITY_ARRAY', (prefCode) => CITY_ARRAY(prefCode))
  inject('CITY', CITY)
  inject('COLLECTION_RESULT_TYPE', COLLECTION_RESULT_TYPE)
  inject('COLLECTION_RESULT_TYPE_ARRAY', COLLECTION_RESULT_TYPE_ARRAY)
  inject('CUSTOMER_STATUS', CUSTOMER_STATUS)
  inject('CUSTOMER_STATUS_ARRAY', CUSTOMER_STATUS_ARRAY)
  inject('DEADLINE', DEADLINE)
  inject('DEADLINE_ARRAY', DEADLINE_ARRAY)
  inject('EDIT_MODE', EDIT_MODE)
  inject('EDIT_MODE_ARRAY', EDIT_MODE_ARRAY)
  inject('PRE_METHOD', PRE_METHOD)
  inject('PRE_METHOD_ARRAY', PRE_METHOD_ARRAY)
  inject('PREFECTURE', PREFECTURE)
  inject('PREFECTURE_ARRAY', PREFECTURE_ARRAY())
  inject('PROCESSING_DIV', PROCESSING_DIV)
  inject('PROCESSING_DIV_ARRAY', PROCESSING_DIV_ARRAY)
  inject('ROUNDING', ROUNDING)
  inject('ROUNDING_ARRAY', ROUNDING_ARRAY)
  inject('SITE_STATUS', SITE_STATUS)
  inject('SITE_STATUS_ARRAY', SITE_STATUS_ARRAY)
  inject('WASTE_DIV', WASTE_DIV)
  inject('WASTE_DIV_ARRAY', WASTE_DIV_ARRAY)
}
