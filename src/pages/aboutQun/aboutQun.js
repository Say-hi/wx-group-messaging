// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    qunImage: '../../images/logo.png',
    qunIntroduce: '在茫茫人海中遇上一堆有共同兴趣爱好的逗比群友...想想也是美滋滋的~',
    fuwu: '生活服务/休闲娱乐 ',
    company: '广州候朋网络科技有限公司',
    gzArr: [
      '../../images/logo.png'
    ]
  },
  goIndex () {
    wx.reLaunch({
      url: '../index/index'
    })
  },
  onShareAppMessage () {
    return {
      title: '向您推荐【群信息】小程序',
      path: '/pages/index/index'
    }
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
