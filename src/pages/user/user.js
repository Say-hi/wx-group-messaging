// 获取全局应用程序实例对象
const app = getApp()

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
        url: ''
      },
      {
        ico: 'icon-guanyu',
        t: '关于群信息',
        url: '../aboutQun/aboutQun'
      }
    ]
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
    if (this.data.user.status * 1 === 0) {
      wx.navigateTo({
        url: '../createNameCard/createNameCard'
      })
      return
    }
    wx.navigateTo({
      url: '../nameCard/nameCard'
    })
  },
  // 编辑个人资料
  edit () {
    wx.navigateTo({
      url: '../editUser/editUser'
    })
  },
  // 去到钱包页面
  goWallet () {
    app.gn('../wallet/wallet')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    let that = this
    setTimeout(() => {
      that.data.user.status = 1
      that.setData({
        user: that.data.user
      })
    }, 5000)
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
