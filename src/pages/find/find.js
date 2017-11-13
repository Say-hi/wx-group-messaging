// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cur: 0,
    infoArr: [
      {
        type: 0,
        image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '唐军',
        content: '发生的发生的',
        contentImg: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
        ],
        address: '汇德商业',
        time: '2017-10-13 02:22',
        qun: '玩社群',
        xin: 156132,
        talk: 5465464
      },
      {
        type: 1,
        image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '唐军',
        content: '发生的发生的',
        contentImg: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
        ],
        address: '汇德商业',
        time: '2017-10-13 02:22',
        qun: '玩社群',
        xin: 156132,
        talk: 5465464
      },
      {
        type: 2,
        image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '唐军',
        content: '发生的发生的',
        wzimg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        wztitle: '发生的发生的发生的发生的发生的发生的',
        address: '汇德商业',
        time: '2017-10-13 02:22',
        qun: '玩社群',
        xin: 156132,
        talk: 5465464
      },
      {
        type: 0,
        image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '唐军',
        content: '发生的发生的',
        contentImg: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
        ],
        address: '汇德商业',
        time: '2017-10-13 02:22',
        qun: '玩社群',
        xin: 156132,
        talk: 5465464
      },
      {
        type: 1,
        image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '唐军',
        content: '发生的发生的',
        contentImg: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
        ],
        address: '汇德商业',
        time: '2017-10-13 02:22',
        qun: '玩社群',
        xin: 156132,
        talk: 5465464
      },
      {
        type: 2,
        image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '唐军',
        content: '发生的发生的',
        wzimg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        wztitle: '发生的发生的发生的发生的发生的发生的',
        address: '汇德商业',
        time: '2017-10-13 02:22',
        qun: '玩社群',
        xin: 156132,
        talk: 5465464
      }
    ]
  },
// 选择导航栏
  chooseNav (e) {
    if (e.currentTarget.dataset.type * 1 === this.data.cur) return
    this.setData({
      cur: e.currentTarget.dataset.type
    })
  },
  // 展示内容详情
  goDetail (e) {
    // let that = this
    app.gn(`../qunMessageDetail/qunMessageDetail?id=${e.currentTarget.dataset.id}`)
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
  onReachBottom () {
    if (this.data.more) {
      setTimeout(() => {
        app.setToast(this, {content: '触底上拉加载数据'})
      })
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    setTimeout(() => {
      wx.stopPullDownRefresh()
      app.setToast(this, {content: '暂无新内容'})
    }, 1500)
    // TODO: onPullDownRefresh
  }
})
