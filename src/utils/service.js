/**
 * Created by Administrator on 2017/6/2.
 */
let baseDomain = 'http://group.lanzhangxiu.cn'
let serviceUrl = {
  login: baseDomain + '/api/public/login',
  sendMobileCode: baseDomain + '/api/public/sendMobileCode',
  uploadPhotos: baseDomain + '/api/public/uploadPhotos',
  indexHotGroup: baseDomain + '/api/index/indexHotGroup',
  indexApplicationLists: baseDomain + '/api/index/indexApplicationLists',
  getGroupLists: baseDomain + '/api/index/getGroupLists',
  getGroupCategoryLists: baseDomain + '/api/group/getGroupCategoryLists',
  userAddGroup: baseDomain + '/api/group/userAddGroup',
  addGroup: baseDomain + '/api/group/addGroup'

}
module.exports = serviceUrl
