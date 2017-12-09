// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
const time = new Date().getFullYear() + '-' + ((new Date().getMonth() * 1 + 1) < 10 ? '0' + (new Date().getMonth() * 1 + 1) : (new Date().getMonth() * 1 + 1)) + '-' + ((new Date().getDate() * 1) < 10 ? '0' + (new Date().getDate()) : (new Date().getDate()))
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lists: [],
    messageCount: 0
  },
  // 选择时间
  chooseTime (e) {
    this.setData({
      time: e.detail.value
    })
    this.getMessageList(1)
  },
  // 续费社群
  renewQun (e) {
    let that = this
    app.wxrequest({
      url: useUrl.renewGroup,
      data: {
        session_key: app.gs(),
        group_id: e.currentTarget.dataset.id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          wx.showToast({
            title: '续费成功'
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取用户的消息
  getMessageList (page = 1) {
    let that = this
    app.wxrequest({
      url: useUrl.getUserMessageLists,
      data: {
        session_key: app.gs(),
        page,
        date_time: that.data.time
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          app.setMore(res.data.data, that)
          if (page === 1) {
            that.setData({
              page: 1,
              lists: [],
              messageCount: 0
            })
          }
          let count = 0
          for (let v of res.data.data) {
            if (parseInt(v.is_look) === 0) {
              count++
            }
          }
          that.setData({
            lists: that.data.lists.concat(res.data.data),
            messageCount: parseInt(that.data.messageCount) + count
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 用户查看消息
  goCheck (e) {
    if (parseInt(e.currentTarget.dataset.islook) === 0) this.upMessage(e)
    // todo 根据类型操作消息的跳转
    let type = parseInt(e.currentTarget.dataset.type)
    if (type === 1) {
      app.gn(`../qunMessageDetail/qunMessageDetail?id=${this.data.lists[e.currentTarget.dataset.index].gfc_id}&user_id=${this.data.lists[e.currentTarget.dataset.index].user_id}&group_id=${this.data.lists[e.currentTarget.dataset.index].group_id}`)
    } else if (type === 3 || type === 5) {
      app.gn(`../myQun/myQun?id=${e.currentTarget.dataset.useid}`)
    } else if (type === 2) {
      app.gn(`../nameCard/nameCard`)
    } else if (type === 4) {
      let that = this
      app.wxrequest({
        url: useUrl.renewGroup,
        data: {
          session_key: app.gs(),
          group_id: e.currentTarget.dataset.useid
        },
        success (res) {
          wx.hideLoading()
          if (res.data.code === 402) {
            let obj = {
              success (res) {
                if (res.errMsg === 'requestPayment:ok') {
                  app.setToast(that, {content: '续费成功'})
                  setTimeout(() => {
                    wx.redirectTo({
                      url: `../myQun/myQun?id=${that.data.qunInfo.group_id}`
                    })
                  }, 1000)
                } else {
                  wx.showToast({
                    image: '../../images/jiong.png',
                    title: '未完成支付'
                  })
                }
              },
              fail () {
                // todo 支付失败
                wx.showToast({
                  image: '../../images/jiong.png',
                  title: '未完成支付'
                })
              }
            }
            Object.assign(obj, res.data.data)
            app.wxpay(obj)
          } else {
            app.setToast(that, {content: res.data.message})
          }
        }
      })
    }
  },
  // 更新消息状态
  upMessage (e) {
    let that = this
    app.wxrequest({
      url: useUrl.userLookMessage,
      data: {
        session_key: app.gs(),
        id: e.currentTarget.dataset.id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.data.lists[e.currentTarget.dataset.index].is_look = 1
          that.setData({
            lists: that.data.lists,
            messageCount: --that.data.messageCount
          })
        }
      }
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
    this.getMessageList()
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
      this.getMessageList(++this.data.page)
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
