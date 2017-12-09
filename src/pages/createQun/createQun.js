// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// const common = require('../../utils/common')
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
    joinArr: ['免费加入', '付费加入', '验证码加入'],
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
    addIndex: 1,
    chooseImgIndex: 0,
    showR: false,
    focus: false
  },
  // 社群搜索切换
  searchange (e) {
    this.setData({
      is_allow_search: e.detail.value ? 1 : 0
    })
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
      moneyPay: false,
      showMain: false
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
    if (this.data.type) return this.saveConfirm()
    if (this.data.userInfo[1].r === '请输入社群名称，不超过8个字') {
      return app.setToast(this, {content: '请输入社群名字'})
    } else if (this.data.userInfo[2].r === '请输入组织机构全称') {
      return app.setToast(this, {content: '请输入组织机构名称'})
    } else if (!this.data.introduceText || this.data.introduceText.trim().length <= 0) {
      return app.setToast(this, {content: '请输入社群介绍'})
    } else if (!app.gs('classifyId')) {
      return app.setToast(this, {content: '请选择社群分类'})
    }
    let createPermission = app.gs('createPermission')
    let data = {
      session_key: app.gs(),
      group_friend_circle: 1,
      mail_list: 1,
      day_release: 0,
      recommend_num: 0,
      group_content_astrict: '',
      group_image: this.data.userInfo[0].r,
      group_name: this.data.userInfo[1].r,
      group_mechanism: this.data.userInfo[2].r,
      group_desc: this.data.introduceText,
      adding_modality: this.data.addIndex,
      pay_type: this.data.chooseMoneyIndex * 1 + 1,
      pay_money: this.data.money || 0,
      adding_code: this.data.qunCode || '',
      is_allow_search: this.data.is_allow_search || 1,
      group_background_image: this.data.userInfo[7].r,
      group_categorys: app.gs('classifyId')
    }
    let that = this
    Object.assign(data, createPermission)
    app.wxrequest({
      url: useUrl.addGroup,
      data,
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          app.setToast(that, {content: '创建成功'})
          wx.removeStorageSync('classify')
          wx.removeStorageSync('classifyId')
          wx.removeStorageSync('chooseIndex')
          wx.removeStorageSync('permissionArr')
          wx.removeStorageSync('createPermission')
          wx.removeStorageSync('contentArr')
          wx.removeStorageSync('fabuArr')
          // setTimeout(() => {
          //   wx.navigateBack({
          //     delta: 1
          //   })
          // }, 1000)
          setTimeout(() => {
            app.gn(`../myQun/myQun?id=${res.data.data.group_id}`)
          }, 1000)
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 保存修改的社群信息
  saveConfirm () {
    let createPermission = app.gs('createPermission')
    let data = {
      session_key: app.gs(),
      group_id: this.data.groupId,
      group_friend_circle: 1,
      mail_list: 1,
      day_release: 0,
      recommend_num: 0,
      group_content_astrict: '',
      group_image: this.data.userInfo[0].r,
      group_name: this.data.userInfo[1].r,
      group_mechanism: this.data.userInfo[2].r,
      group_desc: this.data.introduceText || this.data.userInfo[3].r,
      adding_modality: this.data.addIndex,
      pay_type: this.data.chooseMoneyIndex * 1 + 1,
      pay_money: this.data.money || 0,
      adding_code: this.data.qunCode || '',
      is_allow_search: this.data.is_allow_search || 1,
      group_background_image: this.data.userInfo[7].r,
      group_categorys: app.gs('classifyId')
    }
    let that = this
    Object.assign(data, createPermission)
    app.wxrequest({
      url: useUrl.postUpdateGroupInfo,
      data,
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          app.setToast(that, {content: '保存成功'})
          wx.removeStorageSync('classify')
          wx.removeStorageSync('classifyId')
          wx.removeStorageSync('chooseIndex')
          wx.removeStorageSync('permissionArr')
          wx.removeStorageSync('createPermission')
          wx.removeStorageSync('contentArr')
          wx.removeStorageSync('fabuArr')
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
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
      app.wxUploadImg(imgUrl => {
        userInfo[0].r = imgUrl
        that.setData({
          userInfo
        })
      })
    } else if (type === 'cover') {
      // app.wxUploadImg(imgUrl => {
      //   userInfo[7].r = imgUrl
      //   that.setData({
      //     userInfo
      //   })
      // })
      that.setData({
        backImg: true,
        showMain: true
      })
    } else if (type === 'name' || type === 'belong' || type === 'sign' || type === 'wechat') {
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
          if (res.tapIndex * 1 === 2) {
            that.setData({
              checkCode: true
            })
          } else if (res.tapIndex * 1 === 1) {
            return app.setToast(that, {content: '不提供此类社群创建'})
            // that.setData({
            //   moneyPay: true,
            //   showMain: true
            // })
          }
          that.setData({
            addIndex: res.tapIndex * 1 + 1,
            userInfo: that.data.userInfo
          })
        }
      })
    } else if (type === 'permission') {
      if (this.data.myPer ? this.data.myPer.is_setting * 1 === 0 : false) return app.setToast(this, {content: '您无此权限，请联系群主。'})
      wx.navigateTo({
        url: '../permission/permission'
      })
    } else if (type === 'classify') {
      wx.navigateTo({
        url: '../classify/classify'
      })
    }
  },
  // 选取背景图索引
  chooseBackImgIndex (e) {
    this.setData({
      chooseImgIndex: e.currentTarget.dataset.index
    })
  },
  // 选取背景图
  chooseBackImg (e) {
    let that = this
    if (e.currentTarget.dataset.type === 'confirm') {
      this.data.userInfo[7].r = this.data.backgroundImgArr[this.data.chooseImgIndex].image_url
      this.setData({
        userInfo: that.data.userInfo
      })
    }
    this.setData({
      showMain: false,
      backImg: false
    })
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
    let { type } = e.currentTarget.dataset
    if (type === 'qunCode') {
      this.setData({
        qunCode: e.detail.value
      })
    } else if (type === 'money') {
      this.setData({
        money: e.detail.value
      })
    } else {
      this.data.value = e.detail.value
    }
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
  // 获取社群信息
  getQunInfo (id) {
    let that = this
    app.wxrequest({
      url: useUrl.updateGroupInfoPage,
      data: {
        session_key: app.gs(),
        group_id: id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          let u = that.data.userInfo
          let d = res.data.data
          u[0].r = d.group_image
          u[1].r = d.group_name
          u[2].r = d.group_mechanism
          u[3].r = d.group_desc
          u[4].r = parseInt(d.adding_modality) === 1 ? '免费加入' : parseInt(d.adding_modality) === 2 ? '付费加入' : '验证码加入'
          u[6].r = parseInt(d.is_allow_search) === 1 ? 'true' : ''
          u[7].r = d.group_background_image
          let cId = []
          for (let v of d.categorys) {
            u[8].r += ` ${v.cat_name}`
            cId.push(v.cat_id)
          }
          that.setData({
            userInfo: u,
            addIndex: parseInt(d.adding_modality),
            chooseMoneyIndex: d.pay_type - 1,
            qunCode: !d.adding_code ? '' : d.adding_code,
            money: !d.pay_money ? '' : d.pay_money
          })
          that.getQunBackGround('asd')
          /*eslint-disable*/
          app.su('fabuArr', [{'l': '一天发布次数', 'r': parseInt(d.day_release) === 0 ? '不限制' : d.day_release}, {'l': '要求推荐进群数', 'r': parseInt(d.recommend_num) === 0 ? '不限制' : d.recommend_num}])
          app.su('contentArr', [{'l': '文字', 'r': d.group_content_astrict.indexOf('1') >= 0 ? true : false}, {'l': '图片', 'r': d.group_content_astrict.indexOf('2') >= 0 ? true : false}, {'l': '语音', 'r': d.group_content_astrict.indexOf('3') >= 0 ? true : false}, {'l': '文章', 'r': d.group_content_astrict.indexOf('4') >= 0 ? true : false}])
          app.su('permissionArr', [{'l': '群友圈', 'r': parseInt(d.group_friend_circle) === 1 ? '加入后可见' : '所有人可见'}, {'l': '通讯录', 'r': parseInt(d.mail_list) === 1 ? '加入后可见' : '所有人可见'},{'l': '发群友圈要求', 'r': '已设置'}, {'l': '群友圈内容限制', 'r': '已设置'}])
          app.su('classifyId', cId.toString())
          app.su('createPermission', {'group_friend_circle': d.group_friend_circle, 'mail_list': d.mail_list, 'day_release': d.day_release, 'recommend_num': d.recommend_num, 'group_content_astrict': d.group_content_astrict.toString()})
          /*eslint-enable*/
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取自己的权限
  getMyPermission () {
    let that = this
    app.wxrequest({
      url: useUrl.managerAuthorityPage,
      data: {
        session_key: app.gs(),
        group_id: that.data.groupId
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            myPer: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取背景图
  getQunBackGround (type) {
    let that = this
    app.wxrequest({
      url: useUrl.getGroupBackgroundLists,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            backgroundImgArr: res.data.data
          })
          if (!type) {
            that.data.userInfo[7].r = that.data.backgroundImgArr[0].image_url
            that.setData({
              userInfo: that.data.userInfo
            })
          }
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    if (options.id) {
      this.setData({
        groupId: options.id,
        type: 'edit'
      })
      app.setBar('编辑社群信息')
      this.getQunInfo(options.id)
      this.getMyPermission()
    } else {
      this.getQunBackGround()
    }
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
    wx.removeStorageSync('fabuArr')
    wx.removeStorageSync('contentArr')
    wx.removeStorageSync('permissionArr')
    wx.removeStorageSync('classifyId')
    wx.removeStorageSync('createPermission')
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
