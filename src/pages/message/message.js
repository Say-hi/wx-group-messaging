// 获取全局应用程序实例对象
// const app = getApp()
const time = new Date().getFullYear() + '-' + ((new Date().getMonth() * 1 + 1) < 10 ? '0' + (new Date().getMonth() * 1 + 1) : (new Date().getMonth() * 1 + 1)) + '-' + new Date().getDate()
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lists: [
      {
        image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        content: '阿斯顿发撒旦法',
        time: '10月16日 13:50',
        status: 0
      },
      {
        image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        content: '阿斯顿发撒旦法',
        time: '10月16日 13:50',
        status: 1
      },
      {
        image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        content: '阿斯顿发撒旦法',
        time: '10月16日 13:50',
        status: 2
      },
      {
        image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        content: '阿斯顿发撒旦法',
        time: '10月16日 13:50'
      }
    ],
    messageCount: 1
  },
  // 选择时间
  chooseTime (e) {
    this.setData({
      time: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.setData({
      startTime: time,
      time
    })
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
