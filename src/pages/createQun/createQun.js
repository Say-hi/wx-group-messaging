// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    customItem: '全部',
    userInfo: [
      {
        l: '社群头像',
        r: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        type: 'img'
      },
      {
        l: '社群名称',
        r: '请输入社群名称，不超过8个字',
        type: 'name'
      },
      {
        l: '所属机构',
        r: '请输入组织机构全称',
        type: 'belong'
      },
      {
        l: '社群介绍',
        r: '',
        type: 'introduce'
      },
      {
        l: '成员加入方式',
        r: '免费加入',
        type: 'join'
      },
      {
        l: '权限设置',
        r: '',
        type: 'permission'
      },
      {
        l: '允许用户搜索到我的社群',
        r: '',
        type: 'search'
      },
      {
        l: '社群背景图',
        r: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        type: 'cover'
      },
      {
        l: '社群分类',
        r: '',
        type: 'classify'
      }
    ],
    showText: '获取验证码',
    checked: false,
    chooseIndex: null,
    show: false,
    value: '',
    joinArr: ['免费加入', '验证码加入', '付费加入'],
    ageArr: ['60后', '70后', '80后', '90后', '00后', '10后'],
    genderArr: ['男', '女'],
    qunMoneyType: [
      {
        l: '按月付费',
        r: '月'
      },
      {
        l: '按年付费',
        r: '年'
      },
      {
        l: '永久有效',
        r: '永久'
      }
    ],
    chooseMoneyIndex: 0,
    showR: false
  },
  // 展示提现规则
  showRuler () {
    this.setData({
      showR: !this.data.showR
    })
  },
  // 群验证码设置
  maskBtnOp (e) {
    let { type } = e.currentTarget.dataset
    if (type === 'confirm') {
      // todo
    }
    this.setData({
      checkCode: false
    })
  },
  // 群费按钮操作
  maskMoneyBtn (e) {
    let {type} = e.currentTarget.dataset
    if (type === 'confirm') {
      // todo
    }
    this.setData({
      moneyPay: false
    })
  },
  // 付费类型切换
  chooseQunMoneyType (e) {
    this.setData({
      chooseMoneyIndex: e.currentTarget.dataset.index
    })
  },
  // 确认
  confirm () {
    // todo
    wx.navigateBack({
      delta: 1
    })
  },
  // 地区切换
  bindRegionChange (e) {
    this.data.userInfo[4].r = e.detail.value
    this.setData({
      userInfo: this.data.userInfo
    })
  },
  // 开关切换
  switchChange (e) {
    this.data.checked = e.detail.value
  },
  // 用户操作
  edit (e) {
    let that = this
    let { type, index } = e.currentTarget.dataset
    let { userInfo } = this.data
    if (type === 'img') {
      wx.chooseImage({
        count: 1,
        success (res) {
          // todo 上传图片
          userInfo[0].r = res.tempFilePaths[0]
          that.setData({
            userInfo
          })
        }
      })
    } else if (type === 'cover') {
      wx.chooseImage({
        count: 1,
        success (res) {
          // todo 上传图片
          userInfo[7].r = res.tempFilePaths[0]
          that.setData({
            userInfo
          })
        }
      })
    } else if (type === 'name' || type === 'job' || type === 'sign' || type === 'wechat') {
      this.setData({
        show: true,
        chooseIndex: index,
        value: ''
      })
    } else if (type === 'join') {
      wx.showActionSheet({
        itemList: that.data.joinArr,
        success (res) {
          that.data.userInfo[index].r = that.data.joinArr[res.tapIndex] || that.data.userInfo[index].r
          if (res.tapIndex * 1 === 1) {
            that.setData({
              checkCode: true
            })
          } else if (res.tapIndex * 1 === 2) {
            that.setData({
              moneyPay: true
            })
          }
          that.setData({
            userInfo: that.data.userInfo
          })
        }
      })
    } else if (type === 'permission') {
      wx.navigateTo({
        url: '../permission/permission'
      })
    } else if (type === 'classify') {
      wx.navigateTo({
        url: '../classify/classify'
      })
    }
  },
  // 获取验证码
  getNumber () {
    if (app.checkMobile(this.data.mobile)) {
      return wx.showToast({
        title: '请输入正确的11位手机号码'
      })
    }
    this.setData({
      numberDisabled: true
    })
    let time = 60
    let that = this
    let timer = setInterval(function () {
      if (time <= 0) {
        clearInterval(timer)
        that.setData({
          numberDisabled: false,
          showText: '重新获取验证码'
        })
        return
      }
      that.setData({
        showText: --time + 's'
      })
    }, 1000)
    // 请求手机验证码
    app.wxrequest({
      url: useUrl.sendMobileCode,
      data: {
        mobile: that.data.mobile
      },
      complete (res) {
        wx.hideLoading()
        if (res.data.code === 400) {
          return app.setToast(that, {content: res.data.message})
        } else {
          app.setToast(that, {title: '短信状态', content: '短信发送成功，请注意查收！'})
        }
      }
    })
  },
  // 内容输入
  inputValue (e) {
    this.data.value = e.detail.value
    this.data.hasIn = true
  },
  inputValues (e) {
    app.inputValue(e, this)
  },
  // 填写弹窗操作
  btnChoose (e) {
    if (e.currentTarget.dataset.type === 'confirm' && this.data.hasIn) {
      if (!this.data.value) {
        return app.setToast(this, {content: '未填写内容'})
      }
      this.data.userInfo[this.data.chooseIndex].r = this.data.value
      this.setData({
        userInfo: this.data.userInfo
      })
    }
    this.setData({
      show: false,
      hasIn: false
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
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    if (app.gs('classify')) {
      this.data.userInfo[8].r = app.gs('classify')
      this.setData({
        userInfo: this.data.userInfo
      })
    }
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
    wx.removeStorageSync('classify')
    wx.removeStorageSync('chooseIndex')
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
