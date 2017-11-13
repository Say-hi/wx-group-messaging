// 获取全局应用程序实例对象
const app = getApp()
// const time = new Date().getFullYear() + '-' + ((new Date().getMonth() * 1 + 1) < 10 ? '0' + (new Date().getMonth() * 1 + 1) : (new Date().getMonth() * 1 + 1)) + '-' + new Date().getDate()
const time = new Date().getFullYear() + '-' + ((new Date().getMonth() * 1 + 1) < 10 ? '0' + (new Date().getMonth() * 1 + 1) : (new Date().getMonth() * 1 + 1))
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    money: '29.12',
    indexShow: true,
    allMoney: 200,
    detailArr: [
      {
        title: '入群-小兰',
        content: '一笔入群费到账户！',
        time: '2017-10-14 10:36',
        money: '+1.00'
      },
      {
        title: '入群-小兰',
        content: '一笔入群费到账户！',
        time: '2017-10-14 10:36',
        money: '+1.00'
      },
      {
        title: '入群-小兰',
        content: '一笔入群费到账户！',
        time: '2017-10-14 10:36',
        money: '+1.00'
      },
      {
        title: '入群-小兰',
        content: '一笔入群费到账户！',
        time: '2017-10-14 10:36',
        money: '+1.00'
      },
      {
        title: '入群-小兰',
        content: '一笔入群费到账户！',
        time: '2017-10-14 10:36',
        money: '+1.00'
      },
      {
        title: '入群-小兰',
        content: '一笔入群费到账户！',
        time: '2017-10-14 10:36',
        money: '+1.00'
      },
      {
        title: '入群-小兰',
        content: '一笔入群费到账户！',
        time: '2017-10-14 10:36',
        money: '+1.00'
      },
      {
        title: '入群-小兰',
        content: '一笔入群费到账户！',
        time: '2017-10-14 10:36',
        money: '+1.00'
      },
      {
        title: '入群-小兰',
        content: '一笔入群费到账户！',
        time: '2017-10-14 10:36',
        money: '+1.00'
      },
      {
        title: '入群-小兰',
        content: '一笔入群费到账户！',
        time: '2017-10-14 10:36',
        money: '+1.00'
      },
      {
        title: '入群-小兰',
        content: '一笔入群费到账户！',
        time: '2017-10-14 10:36',
        money: '+1.00'
      },
      {
        title: '入群-小兰',
        content: '一笔入群费到账户！',
        time: '2017-10-14 10:36',
        money: '+1.00'
      }
    ]
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
    } else if (parseInt(value) < 10) {
      app.setToast(this, {content: '提现最小金额为10元'})
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
    } else {
      this.setData({
        indexShow: false,
        moneyShow: true
      })
      app.setBar('提现')
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
