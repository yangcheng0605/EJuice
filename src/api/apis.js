import { get, post } from '../utils/http'
/* api管理 */
function picList(data) {
  return get('/dzy/ccgj/pic/api/list', data)
}
function categoryList(data) {
  return get('/dzy/ccgj/category/api/list', data)
}
function productList(data) {
  return get('/dzy/ccgj/product/api/detail/' + data )
}
function productListByCate(data) {
  return get('/dzy/ccgj/product/api/listByCate/' + data)
}
function blogList(data) {
  return get('/dzy/ccgj/news/api/list', data)
}
function blogDetail(data) {
  return get('/dzy/ccgj/news/detail/' + data)
}
export {
  picList,
  categoryList,
  productList,
  productListByCate,
  blogList,
  blogDetail,
}
