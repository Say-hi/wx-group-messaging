// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    leftArr: [
      // '移动互联网',
      // '电子商务',
      // '社交网络',
      // '企业服务',
      // '信息安全',
      // '数据服务',
      // '智能硬件',
      // '广告传媒',
      // '传媒',
      // '房地产',
      // '文化娱乐',
      // '游戏',
      // '餐饮',
      // '金融理财',
      // '教育培训',
      // '票务',
      // '政务民生',
      // '法务咨询',
      // '医疗健康',
      // '美容健身',
      // '交通餐饮',
      // '物流服务',
      // '招聘',
      // '其他'
    ],
    rightArr: [],
    chooseIndex: 0
  },
  // 获取社群分类列表
  getClassify () {
    let that = this
    app.wxrequest({
      url: useUrl.getGroupCategoryLists,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            leftArr: res.data.data
          })
          that.getQun(res.data.data[0].cat_id)
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取分类群
  getQun (catId) {
    let that = this
    app.wxrequest({
      url: useUrl.getGroupLists,
      data: {
        session_key: app.gs(),
        cat_id: catId
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            rightArr: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 左侧选择
  chooseI (e) {
    if (e.currentTarget.dataset.index * 1 === this.data.chooseIndex * 1) return
    this.setData({
      chooseIndex: e.currentTarget.dataset.index
    })
    this.getQun(e.currentTarget.dataset.id)
  },
  // 跳转到群
  goQun (e) {
    app.gn(`../addQun/addQun?id=${e.currentTarget.dataset.id}`)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getClassify()
    // TODO: onLoad
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
