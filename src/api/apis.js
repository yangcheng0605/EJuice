import { get, post } from '../utils/http'
// banner接口
function getBannerList(data) {
  return get('/nex/ccgj/api/banner/getBanner/' + data)
}
// 根据分类获取产品列表
function getProductList(data) {
  return get('/nex/ccgj/api/product/listByCate/' + data )
}
// 获取产品详情
function getProduct(data) {
  return get('/nex/ccgj/api/product/'+ data)
}
// 获取分类列表
function getCategoryList(data) {
  return get('/nex/ccgj/api/category/list')
}
// 获取口味模块
function getIndexCard(data) {
  return get('/nex/ccgj/api/tcard/getIndexCard')
}
// 获取轮播图
function getPicList(data) {
  return get('/nex/ccgj/api/pic/list')
}
// 首页视频
function getVideo(data) {
  return get('/nex/ccgj/api/video/getVideo')
}

export {
  getBannerList,
  getProductList,
  getProduct,
  getCategoryList,
  getIndexCard,
  getPicList,
  getVideo,
}
