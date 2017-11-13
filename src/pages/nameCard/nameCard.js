// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user_bg: 'https://c.jiangwenqiang.com/api/group_user_bg.png',
    userInfo: {
      img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      name: '发拉萨的空间发'
    },
    userOp: [
      {
        ico: 'icon-erweima',
        t: '小程序码',
        type: 'erwei'
      },
      {
        ico: 'icon-qianbao1',
        t: '打赏',
        type: 'dashang'
      },
      {
        ico: 'icon-liuyan',
        t: '留言',
        type: 'liuyan'
      }
    ],
    userInfoShow: [
      {
        l: '头像',
        r: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        type: 'img'
      },
      {
        l: '姓名',
        r: '阿斯顿发生大',
        type: 'name'
      },
      {
        l: '性别',
        r: '男',
        type: 'gender'
      },
      {
        l: '年龄段',
        r: '80后',
        type: 'age'
      },
      {
        l: '地区',
        r: ['广东省', '广州市', '天河区'],
        type: 'area'
      },
      {
        l: '职业',
        r: '销售',
        type: 'job'
      },
      {
        l: '手机',
        r: '18855953417',
        type: 'phone'
      },
      {
        l: '微信号',
        r: 'asdf5464',
        type: 'wechat'
      },
      {
        l: '个性签名',
        r: '阿迪法撒旦飞洒地方',
        type: 'sign'
      },
      {
        l: '群友圈',
        r: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'https://c.jiangwenqiang.com/api/group_user_bg.png',
          'https://c.jiangwenqiang.com/api/group_user_bg.png',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
        ],
        type: 'quan'
      }
    ],
    showPageTwo: false,
    showPageThree: false,
    erweima: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    moneyChoose: 0,
    moneyArr: ['1', '3', '8', '18', '38', '88'],
    payMoney: 1,
    commentArr: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '江文强',
        comment: '撒旦法撒旦法',
        time: '3星期前',
        reply: {
          name: '江文强',
          comment: '撒旦法撒旦法',
          time: '3星期前'
        }
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '江文强',
        comment: '撒旦法撒旦法',
        time: '3星期前',
        reply: {
          name: '江文强',
          comment: '撒旦法撒旦法',
          time: '3星期前'
        }
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '江文强',
        comment: '撒旦法撒旦法',
        time: '3星期前',
        reply: {
          name: '江文强',
          comment: '撒旦法撒旦法',
          time: '3星期前'
        }
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '江文强',
        comment: '撒旦法撒旦法',
        time: '3星期前',
        reply: {
          name: '江文强',
          comment: '撒旦法撒旦法',
          time: '3星期前'
        }
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '江文强',
        comment: '撒旦法撒旦法',
        time: '3星期前',
        reply: {
          name: '江文强',
          comment: '撒旦法撒旦法',
          time: '3星期前'
        }
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '江文强',
        comment: '撒旦法撒旦法',
        time: '3星期前',
        reply: {
          name: '江文强',
          comment: '撒旦法撒旦法',
          time: '3星期前'
        }
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '江文强',
        comment: '撒旦法撒旦法',
        time: '3星期前',
        reply: {
          name: '江文强',
          comment: '撒旦法撒旦法',
          time: '3星期前'
        }
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '江文强',
        comment: '撒旦法撒旦法',
        time: '3星期前',
        reply: {
          name: '江文强',
          comment: '撒旦法撒旦法',
          time: '3星期前'
        }
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '江文强',
        comment: '撒旦法撒旦法',
        time: '3星期前',
        reply: {
          name: '江文强',
          comment: '撒旦法撒旦法',
          time: '3星期前'
        }
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '江文强',
        comment: '撒旦法撒旦法',
        time: '3星期前',
        reply: {
          name: '江文强',
          comment: '撒旦法撒旦法',
          time: '3星期前'
        }
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '江文强',
        comment: '撒旦法撒旦法',
        time: '3星期前',
        reply: {
          name: '江文强',
          comment: '撒旦法撒旦法',
          time: '3星期前'
        }
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '江文强',
        comment: '撒旦法撒旦法',
        time: '3星期前',
        reply: {
          name: '江文强',
          comment: '撒旦法撒旦法',
          time: '3星期前'
        }
      }
    ],
    fiveChoose: 0
  },
  fiveNavC (e) {
    let index = parseInt(e.currentTarget.dataset.index)
    if (index === this.data.fiveChoose) return
    this.setData({
      fiveChoose: index
    })
  },
  // 留言模态窗操作
  lyBtnIOp (e) {
    let {type} = e.currentTarget.dataset
    if (type === 'confirm') {

    }
    this.setData({
      inputLY: false
    })
  },
  // 留言按钮操作
  lyBtnOp (e) {
    let { type } = e.currentTarget.dataset
    if (type === 'confirm') {
      this.setData({
        inputLY: true
      })
    } else {
      this.setData({
        showPageFour: false
      })
    }
  },
  // 打赏选择金额
  chooseMoney (e) {
    this.setData({
      moneyChoose: e.currentTarget.dataset.index,
      payMoney: e.currentTarget.dataset.money
    })
  },
  // 返回操作
  back () {
    if (this.data.ds) {
      return wx.navigateBack({
        delta: 1
      })
    }
    this.setData({
      showPageTwo: false,
      showPageThree: false
    })
    wx.setNavigationBarTitle({
      title: `个人详情`
    })
  },
  // 用户操作
  op (e) {
    let { type } = e.currentTarget.dataset
    if (type === 'erwei') {
      wx.setNavigationBarTitle({
        title: `分享码`
      })
      this.setData({
        showPageTwo: true
      })
    } else if (type === 'dashang') {
      wx.setNavigationBarTitle({
        title: `打赏`
      })
      this.setData({
        showPageThree: true
      })
    } else if (type === 'liuyan') {
      wx.setNavigationBarTitle({
        title: '留言'
      })
      this.setData({
        showPageFour: true
      })
    }
  },
  // 图片预览
  preview (e) {
    app.showImg(e, this.data.userInfoShow[9].r)
  },
  // 编辑个人资料
  edit () {
    wx.navigateTo({
      url: '../editUser/editUser'
    })
  },
  // 自定义金额
  customM () {
    this.setData({
      customMI: true
    })
  },
  // 打赏支付
  pay () {
    // todo 微信支付
  },
  // 自定义金额弹窗处理
  btnChoose (e) {
    let { type } = e.currentTarget.dataset
    if (type === 'cancel') {
      this.setData({
        customMI: false
      })
    } else {
      // todo 微信支付
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad () {
    // let params = {}
    // params['from'] = 'share'
  onLoad (params) {
    if (params.from === 'share') {
      this.setData({
        share: true
      })
    }
    // 从ds过来的
    if (params.from === 'ds') {
      this.setData({
        ds: true,
        showPageThree: true
      })
      wx.setNavigationBarTitle({
        title: `打赏`
      })
    }
    this.setData({
      pageHeight: wx.getSystemInfoSync().screenHeight
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
