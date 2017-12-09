// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cur: 0,
    showCur: -1,
    infoArr: []
  },
// 选择导航栏
  chooseNav (e) {
    if (e.currentTarget.dataset.type * 1 === this.data.cur) return
    this.setData({
      cur: e.currentTarget.dataset.type,
      showCur: e.currentTarget.dataset.type * 1 + 1
    })
    // this.getQun(e.currentTarget.dataset.type)
  },
  // 展示内容详情
  goDetail (e) {
    app.gn(`../qunMessageDetail/qunMessageDetail?id=${e.currentTarget.dataset.id}&user_id=${e.currentTarget.dataset.userid}&group_id=${e.currentTarget.dataset.groupid}`)
  },
  // 跳转群圈
  goQun (e) {
    app.gn(`../myQun/myQun?id=${e.currentTarget.dataset.id}`)
  },
  // 群群友主页
  // goUser (e) {
  //   app.gn(`../nameCard/nameCard?id=${e.currentTarget.dataset.id}`)
  // },
  // 获取群友圈
  getQun (page = 1) {
    let that = this
    app.wxrequest({
      url: useUrl.getUserGroupFriendCircleLists,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        if (res.data.code === 200) {
          app.setMore(res.data.data, that)
          if (page === 1) {
            that.setData({
              page: 1,
              infoArr: []
            })
          }
          that.setData({
            infoArr: that.data.infoArr.concat(res.data.data)
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getQun(0)
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
  // onReachBottom () {
  //   if (this.data.more) {
  //     this.getQun(++this.data.page)
  //   }
  // },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    this.getQun()
    // TODO: onPullDownRefresh
  }
})
