// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: {
      img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      name: '阿飞斯蒂芬',
      phone: '18855953418',
      status: 0
    },
    operation: [
      {
        ico: 'icon-erweima',
        t: '分享码',
        url: ''
      },
      {
        ico: 'icon-member',
        t: '用户交流群',
        url: ''
      },
      {
        ico: 'icon-yiwen',
        t: '新手帮助',
        url: '../userHelp/userHelp'
      },
      {
        ico: 'icon-kefu1',
        t: '意见反馈',
        url: 'button'
      },
      {
        ico: 'icon-guanyu',
        t: '关于群信息',
        url: '../aboutQun/aboutQun'
      }
    ]
  },
  // 群群友圈
  goQunCircle () {
    app.gn(`../qunCircle/qunCircle`)
  },
  // 导航操作
  tapNav (e) {
    let that = this
    if (e.currentTarget.dataset.t === '分享码') {
      wx.previewImage({
        urls: [that.data.userInfo.qrcode]
      })
    } else if (e.currentTarget.dataset.t === '用户交流群') {
      wx.previewImage({
        urls: [`${app.data.basedomain}/public/images/group_logo.png`]
      })
    }
  },
  // 显示公众号弹窗
  showGzh () {
    // app.setGzh(this,{image: '', name: '', addname: '阿斯顿发撒旦法'})
    app.setGzh(this)
  },
  // 关闭公众号弹窗
  closeGzh () {
    app.closeGzh(this)
  },
  // 去到名片卡
  goNameCard () {
    if (this.data.user.is_has_card * 1 === 0) {
      return wx.navigateTo({
        url: '../createNameCard/createNameCard'
      })
    }
    wx.navigateTo({
      url: '../nameCard/nameCard'
    })
  },
  // 编辑个人资料
  edit () {
    if (this.data.user.is_has_card * 1 === 0) {
      app.setToast(this, {content: '您还没有创建名片'})
      setTimeout(() => {
        app.gn('../createNameCard/createNameCard')
      }, 1000)
    } else {
      wx.navigateTo({
        url: '../editUser/editUser'
      })
    }
  },
  // 去到钱包页面
  goWallet () {
    app.gn('../wallet/wallet')
  },
  // 用户个人中心
  getUser () {
    let that = this
    app.wxrequest({
      url: useUrl.userCenterInfo,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            user: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取用户个人详情
  getUserDetail () {
    let that = this
    app.wxrequest({
      url: useUrl.userInfoDetail,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            userInfo: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },

  getML () {
    app.gML()
  },
  goMessage () {
    wx.switchTab({
      url: '../message/message'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getUserDetail()
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
    this.getUser()
    // this.getML()
    app.gML(this)
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
