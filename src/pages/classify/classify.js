// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chooseIndex: [],
    chooseArr: [
      '移动互联网',
      '电子商务',
      '社交网络',
      '企业服务',
      '信息安全',
      '数据服务',
      '智能硬件',
      '广告传媒',
      '传媒',
      '房地产',
      '文化娱乐',
      '游戏',
      '餐饮',
      '金融理财',
      '教育培训',
      '票务',
      '政务民生',
      '法务咨询',
      '医疗健康',
      '美容健身',
      '交通餐饮',
      '物流服务',
      '招聘',
      '其他'
    ]
  },
  // 选择选项
  choose (e) {
    for (let i = 0; i < this.data.chooseIndex.length; i++) {
      if (this.data.chooseIndex[i] * 1 === e.currentTarget.dataset.index * 1) {
        this.data.chooseIndex.splice(i, 1)
        return this.setData({
          chooseIndex: this.data.chooseIndex
        })
      }
    }
    this.data.chooseIndex.unshift(e.currentTarget.dataset.index)
    this.setData({
      chooseIndex: this.data.chooseIndex.slice(0, 3)
    })
  },
  // 确认返回
  confirm () {
    if (this.data.chooseIndex.length < 1) {
      return app.setToast(this, {content: '您至少要选择一个分类哦~'})
    }
    let classify = ''
    for (let v of this.data.chooseIndex) {
      classify += this.data.chooseArr[v] + ' '
    }
    wx.setStorageSync('classify', classify)
    wx.setStorageSync('chooseIndex', this.data.chooseIndex)
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.setData({
      chooseIndex: app.gs('chooseIndex') || []
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
