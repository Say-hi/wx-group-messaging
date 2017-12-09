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
        l: '头像',
        r: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        type: 'img'
      },
      {
        l: '姓名',
        r: '非正式数据',
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
        r: '非正式数据',
        type: 'job'
      },
      {
        l: '手机',
        r: '非正式数据',
        type: 'phone'
      },
      {
        l: '验证码',
        r: '',
        type: 'code'
      },
      {
        l: '微信号',
        r: '非正式数据',
        type: 'wechat'
      },
      {
        l: '个性签名',
        r: '非正式数据',
        type: 'sign'
      }
    ],
    showText: '获取验证码',
    checked: false,
    chooseIndex: null,
    show: false,
    value: '',
    ageArr: ['60后', '70后', '80后', '90后', '00后', '10后'],
    genderArr: ['男', '女']
  },
  // 确认创建名片
  confirm () {
    let that = this
    let { userInfo, mobile, code } = this.data
    let showTips = 'ok'
    if (!userInfo[1].r.trim()) {
      showTips = '请填写姓名'
    } else if (userInfo[3].r === '未填写') {
      showTips = '请选择年龄段'
    } else if (userInfo[4].r[0] === '全部' || userInfo[4].r[1] === '全部') {
      showTips = '请选择所属地区'
    } else if (userInfo[5].r === '未填写' || !userInfo[5].r.trim()) {
      showTips = '请填写您的职业'
    } else if (!mobile || mobile.length * 1 !== 11) {
      showTips = '请填正确写您的手机号'
    } else if (!code || !code.trim()) {
      showTips = '请填写验证码'
    } else if (userInfo[8].r === '未填写' || !userInfo[8].r.trim()) {
      showTips = '请填写微信号'
    } else if (userInfo[9].r === '未填写' || !userInfo[9].r.trim()) {
      showTips = '请填写个性签名'
    }
    if (showTips !== 'ok') {
      return app.setToast(this, {content: showTips})
    }
    app.wxrequest({
      url: useUrl.saveBusinessCardInfo,
      data: {
        session_key: app.gs(),
        avatar: userInfo[0].r,
        nickname: userInfo[1].r,
        sex: userInfo[2].r,
        age: userInfo[3].r,
        province: userInfo[4].r[0],
        city: userInfo[4].r[1],
        occupation: userInfo[5].r,
        mobile,
        mobile_code: code,
        wechat_no: userInfo[8].r,
        signature: userInfo[9].r,
        is_mobile_privacy: that.data.checked ? 1 : 0
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          wx.navigateBack({
            delta: 1
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
    // todo
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
      app.wxUploadImg(imgUrl => {
        userInfo[0].r = imgUrl
        that.setData({
          userInfo
        })
      })
    } else if (type === 'name' || type === 'job' || type === 'sign' || type === 'wechat') {
      this.setData({
        show: true,
        chooseIndex: index,
        value: ''
      })
    } else if (type === 'age') {
      wx.showActionSheet({
        itemList: that.data.ageArr,
        success (res) {
          that.data.userInfo[index].r = that.data.ageArr[res.tapIndex] || that.data.userInfo[index].r
          that.setData({
            userInfo: that.data.userInfo
          })
        }
      })
    } else if (type === 'gender') {
      wx.showActionSheet({
        itemList: that.data.genderArr,
        success (res) {
          that.data.userInfo[index].r = that.data.genderArr[res.tapIndex] || that.data.userInfo[index].r
          that.setData({
            userInfo: that.data.userInfo
          })
        }
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
  // 获取名片基本内容
  getInfo () {
    let that = this
    app.wxrequest({
      url: useUrl.createBusinessCard,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.data.userInfo[0].r = res.data.data.avatar
          that.data.userInfo[1].r = res.data.data.nickname
          that.data.userInfo[2].r = parseInt(res.data.data.sex) === 1 ? '男' : '女'
          that.data.userInfo[3].r = res.data.data.age || '未填写'
          that.data.userInfo[4].r = [res.data.data.province, res.data.data.city]
          that.data.userInfo[5].r = res.data.data.occupation || '未填写'
          that.data.userInfo[6].r = res.data.data.mobile || '未填写'
          that.data.userInfo[8].r = res.data.data.wechat_no || '未填写'
          that.data.userInfo[9].r = res.data.data.signature || '未填写'
          that.setData({
            userInfo: that.data.userInfo,
            /*eslint-disable*/
            checked: parseInt(res.data.data.is_mobile_privacy) === 0 ? false : true
            /*eslint-enable*/
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
    this.getInfo()
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
