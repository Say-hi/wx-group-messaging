// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user_bg: 'https://c.jiangwenqiang.com/api/group_user_bg.png',
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
        r: '',
        type: 'img'
      },
      {
        l: '姓名',
        r: '',
        type: 'name'
      },
      {
        l: '性别',
        r: '男',
        type: 'gender'
      },
      {
        l: '年龄段',
        r: '',
        type: 'age'
      },
      {
        l: '地区',
        r: [],
        type: 'area'
      },
      {
        l: '职业',
        r: '',
        type: 'job'
      },
      {
        l: '手机',
        r: '',
        type: 'phone'
      },
      {
        l: '微信号',
        r: '',
        type: 'wechat'
      },
      {
        l: '个性签名',
        r: '',
        type: 'sign'
      },
      {
        l: '群友圈',
        r: [],
        type: 'quan'
      }
    ],
    showPageTwo: false,
    showPageThree: false,
    erweima: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    moneyChoose: 0,
    moneyArr: ['1', '3', '8', '18', '38', '88'],
    payMoney: 1,
    commentArr: [],
    fiveChoose: 0
  },
  // 自己留言页操作按钮
  fiveNavC (e) {
    let index = parseInt(e.currentTarget.dataset.index)
    if (index === this.data.fiveChoose) return
    this.setData({
      fiveChoose: index
    })
    this.getLiuYan('', index, 1)
  },
  // 留言模态窗操作
  lyBtnIOp (e) {
    let {type} = e.currentTarget.dataset
    if (type === 'confirm') {
      this.upComment(this.data.userInfo.user_id, this.data.cId)
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
        showPageFour: false,
        showPageFive: false
      })
    }
  },
  // 打赏选择金额
  chooseMoney (e) {
    this.setData({
      moneyChoose: e.currentTarget.dataset.index,
      outMoney: e.currentTarget.dataset.money
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
      if (!this.data.share) {
        this.setData({
          showPageFive: true
        })
        this.getLiuYan()
      } else {
        this.setData({
          showPageFour: true
        })
        this.getLiuYan(this.data.userInfo.user_id)
      }
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
    let that = this
    app.wxrequest({
      url: useUrl.postReward,
      data: {
        session_key: app.gs(),
        user_id: that.data.userInfo.user_id,
        money: that.data.outMoney
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 402) {
          let obj = {
            success (res) {
              if (res.errMsg === 'requestPayment:ok') {
                wx.showToast({
                  title: '打赏成功'
                })
              } else {
                app.setToast(that, {content: '未完成支付，打赏失败'})
              }
            }
          }
          Object.assign(obj, res.data.data)
          app.wxpay(obj)
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
    // todo 微信支付
  },
  // 自定义金额弹窗处理
  btnChoose (e) {
    let { type } = e.currentTarget.dataset
    if (type === 'confirm') this.pay()
    this.setData({
      customMI: false
    })
  },
  // 显示公众号弹窗
  showGzh () {
    app.setGzh(this)
  },
  // 关闭公众号弹窗
  closeGzh () {
    app.closeGzh(this)
  },
  // 获取名片基本内容
  getInfo (id = '') {
    // console.log(id)
    let that = this
    app.wxrequest({
      url: useUrl.createBusinessCard,
      data: {
        session_key: app.gs(),
        user_id: id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.data.userInfoShow[0].r = res.data.data.avatar
          that.data.userInfoShow[1].r = res.data.data.nickname
          that.data.userInfoShow[2].r = parseInt(res.data.data.sex) === 1 ? '男' : '女'
          that.data.userInfoShow[3].r = res.data.data.age || '未填写'
          that.data.userInfoShow[4].r = [res.data.data.province, res.data.data.city]
          that.data.userInfoShow[5].r = res.data.data.occupation || '未填写'
          that.data.userInfoShow[6].r = res.data.data.mobile.length >= 11 ? (res.data.data.is_mobile_privacy * 1 === 0 ? res.data.data.mobile : (res.data.data.mobile.slice(0, 3) + '****' + res.data.data.mobile.slice(7))) : '未填写'
          that.data.userInfoShow[7].r = res.data.data.wechat_no || '未填写'
          that.data.userInfoShow[8].r = res.data.data.signature || '未填写'
          that.setData({
            userInfoShow: that.data.userInfoShow,
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
  // 获取用户个人详情
  getUserDetail (id = '') {
    let that = this
    // console.log(id)
    app.wxrequest({
      url: useUrl.userInfoDetail,
      data: {
        session_key: app.gs(),
        user_id: id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            userInfo: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 判断是否是本人进入
  checkSelf (id) {
    let that = this
    app.wxrequest({
      url: useUrl.userInfoDetail,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          if (!id) {
            return that.setData({
              share: false
            })
          }
          that.setData({
            selfInfo: res.data.data,
            // selfId: res.data.data.user_id,
            share: parseInt(id) === parseInt(res.data.data.user_id) ? '' : 'true'
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取留言
  getLiuYan (userId = '', type = 0, page = 1) {
    let that = this
    app.wxrequest({
      url: useUrl.getLeaveMessageLists,
      data: {
        session_key: app.gs(),
        user_id: userId,
        type,
        page
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          app.setMore(res.data.data, that)
          if (page === 1) {
            that.setData({
              commentArr: [],
              page: 1
            })
          }
          that.setData({
            commentArr: that.data.commentArr.concat(res.data.data)
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 用户输入留言
  inputValues (e) {
    app.inputValue(e, this)
  },
  // 用户确认留言
  upComment (id = '', cId = '') {
    let that = this
    app.wxrequest({
      url: useUrl.addLeaveMessage,
      data: {
        session_key: app.gs(),
        content: that.data.comment,
        user_id: id,
        parent_id: cId
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.getLiuYan(that.data.userInfo.user_id)
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 删除留言
  commentDel (e) {
    let that = this
    app.wxrequest({
      url: useUrl.deleteLeaveMessage,
      data: {
        session_key: app.gs(),
        id: e.currentTarget.dataset.id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          if (that.data.showPageFive) {
            if (!that.data.fiveChoose) {
              that.getLiuYan()
            } else {
              that.getLiuYan('', 1)
            }
          } else {
            that.getLiuYan(that.data.userInfo.user_id)
          }
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 回复留言
  replyUp (e) {
    if (!e.detail.value.trim()) {
      return this.setData({
        replyId: '',
        replyName: ''
      })
    }
    let that = this
    app.wxrequest({
      url: useUrl.addLeaveMessage,
      data: {
        session_key: app.gs(),
        parent_id: that.data.replyId,
        content: e.detail.value
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            replyId: '',
            replyName: ''
          })
          that.getLiuYan()
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 选择回复
  reply (e) {
    this.setData({
      replyId: this.data.commentArr[e.currentTarget.dataset.index].id,
      replyName: this.data.commentArr[e.currentTarget.dataset.index].nickname
    })
  },
  // 分享群信息
  onShareAppMessage () {
    return {
      title: `您的好友${this.data.userInfo.nickname}向您推荐群名片`,
      path: `/pages/nameCard/nameCard?id=${this.data.userInfo.user_id}&from=share`
    }
  },
  // 触底加载更多留言
  onReachBottom () {
    if (this.data.more && (this.data.showPageFive || this.data.showPageFour)) {
      if (!this.data.commentShow) {
        this.getLiuYan('', this.data.fiveChoose, ++this.data.page)
      } else {
        this.getLiuYan(this.data.userInfo.user_id, '', ++this.data.page)
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad () {
    // let params = {}
    // params['from'] = 'share'
  onLoad (options) {
    if (options.id) {
      this.setData({
        payforid: options.id,
        commentShow: 'other'
      })
    }
    this.getInfo(options.id)
    setTimeout(() => {
      this.getUserDetail(options.id)
    }, 200)
    setTimeout(() => {
      this.checkSelf(options.id)
    }, 400)
    // 从ds过来的
    if (options.from === 'ds') {
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
