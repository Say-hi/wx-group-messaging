// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chooseIndex: [],
    chooseArr: []
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
    let classifyId = []
    for (let v of this.data.chooseIndex) {
      classify += this.data.chooseArr[v].cat_name + ' '
      classifyId.push(this.data.chooseArr[v].cat_id)
    }
    wx.setStorageSync('classify', classify)
    wx.setStorageSync('classifyId', classifyId.toString())
    wx.setStorageSync('chooseIndex', this.data.chooseIndex)
    wx.navigateBack({
      delta: 1
    })
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
          let cs = app.gs('classifyId')
          let chooseIndex = []
          for (let v of cs) {
            for (let [val, i] of res.data.data.entries()) {
              if (parseInt(val.cat_id) === parseInt(v)) {
                chooseIndex.push(i)
              }
            }
          }
          that.setData({
            chooseArr: res.data.data,
            chooseIndex
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
    this.getClassify()
    // this.setData({
    //   chooseIndex: app.gs('chooseIndex') || []
    // })
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
