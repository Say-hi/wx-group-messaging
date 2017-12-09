// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    getIn: true,
    focus: false,
    listArr: []
  },
  // 失去焦点
  outBlur (e) {
    if (e.detail.value.trim().length <= 0) {
      this.setData({
        getIn: true,
        focus: false
      })
    } else {
      // this.setData({
      //   value: e.detail.value
      // })
      this.getSearch(e)
      // todo search操作
    }
  },
  // 点击按钮
  searchTap () {
    this.setData({
      getIn: false,
      focus: true
    })
  },
  // 获取用户搜索的内容
  getSearch (e) {
    let that = this
    app.wxrequest({
      url: useUrl.getGroupLists,
      data: {
        session_key: app.gs(),
        group_name: e.detail.value
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            list: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 跳转到群
  goQun (e) {
    app.gn(`../addQun/addQun?id=${e.currentTarget.dataset.id}`)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
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
