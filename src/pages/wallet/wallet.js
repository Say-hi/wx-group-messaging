// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// const time = new Date().getFullYear() + '-' + ((new Date().getMonth() * 1 + 1) < 10 ? '0' + (new Date().getMonth() * 1 + 1) : (new Date().getMonth() * 1 + 1)) + '-' + new Date().getDate()
const time = new Date().getFullYear() + '-' + ((new Date().getMonth() * 1 + 1) < 10 ? '0' + (new Date().getMonth() * 1 + 1) : (new Date().getMonth() * 1 + 1))
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    money: '0.00',
    indexShow: true,
    allMoney: 0,
    last_money: 10,
    detailArr: []
  },
  inputValue (e) {
    app.inputValue(e, this)
  },
  // 提现金额输入
  outMoneyI (e) {
    let value = parseFloat(e.detail.value).toFixed(2)
    if (parseInt(value) >= 200) {
      this.setData({
        outMoney: '200.00'
      })
    } else if (parseInt(value) < this.data.last_money) {
      app.setToast(this, {content: `提现最小金额为${this.data.last_money}元`})
      this.setData({
        outMoney: ''
      })
    } else if (parseFloat(value) > parseFloat(this.data.money)) {
      app.setToast(this, {content: '您的钱包没有这么多钱哦~'})
      this.setData({
        outMoney: ''
      })
    } else {
      this.setData({
        outMoney: value
      })
    }
  },
  // 提取全部金额
  getAll () {
    if (parseInt(this.data.money) >= 200) {
      this.setData({
        outMoney: '200.00'
      })
    } else {
      this.setData({
        outMoney: this.data.money
      })
    }
  },
  // 钱包操作
  walletOp (e) {
    let {type} = e.currentTarget.dataset
    if (type === 'detail') {
      this.setData({
        indexShow: false,
        detailShow: true
      })
      app.setBar('明细')
      this.getDetail()
    } else {
      app.setToast(this, {content: '您好，自动提现功能尚未完善！请联系客服申请提现。微信号 1009572975'}, 5000)
      // this.setData({
      //   indexShow: false,
      //   moneyShow: true
      // })
      // app.setBar('提现')
    }
  },
  // 详情返回
  detailBack () {
    this.setData({
      indexShow: true,
      detailShow: false,
      moneyShow: false
    })
    app.setBar('钱包')
  },
  // 选择时间
  chooseTime (e) {
    let timeArr = e.detail.value.split('-')
    this.setData({
      time: `${timeArr[0]}-${timeArr[1]}`
    })
    this.getDetail(1, this.data.time)
  },
  // 获取钱包信息
  getWallet () {
    let that = this
    app.wxrequest({
      url: useUrl.withdrawalsPage,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            money: res.data.data.user_money,
            last_money: res.data.data.minimum_money
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
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
  // 用户提现
  getMoney () {
    if (this.data.money * 1 < this.data.last_money * 1) return app.setToast(that, {content: '请检查后再提现'})
    let that = this
    app.wxrequest({
      url: useUrl.applyWithdrawals,
      data: {
        session_key: app.gs(),
        apply_money: that.data.money
      },
      success (res) {
        wx.hdieLoading()
        if (res.data.code === 200) {
          wx.showToast({
            title: '提现成功，请耐心等待处理...'
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 用户钱包明细
  getDetail (page = 1, dateTime = '') {
    let that = this
    app.wxrequest({
      url: useUrl.accountLogLists,
      data: {
        session_key: app.gs(),
        page,
        dateTime
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          app.setMore(res.data.data.res_data, that)
          if (page === 1) {
            that.setData({
              detailArr: [],
              page: 1
            })
          }
          // console.log(res.data.total_money)
          that.setData({
            allMoney: res.data.data.total_money,
            detailArr: that.data.detailArr.concat(res.data.data.res_data)
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 加载更多
  addMore () {
    if (this.data.more) {
      this.getDetail(++this.data.page, this.data.time)
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
    this.setData({
      startTime: time,
      time
    })
    this.getWallet()
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
