// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'addQun',
    navArr: ['最新', '点赞最多', '评论最多'],
    navArrSort: ['add_tiem', 'likes_num', 'comment_num'],
    navChoose: 0,
    cur: 0,
    infoArr: [],
    chooseIndex: -1
  },
  // 交流群展示
  jlqShow (e) {
    let { type } = e.currentTarget.dataset
    if (type === 'cancel') {
      this.setData({
        jlqS: false
      })
    } else if (type === 'confirm') {
      wx.previewImage({
        urls: ['../../images/']
      })
      this.setData({
        jlqS: false
      })
    }
  },
  // 验证码输入
  codeShow (e) {
    let { type } = e.currentTarget.dataset
    if (type === 'cancel') {
      this.setData({
        codeS: false
      })
    } else if (type === 'confirm') {
      this.joninQun()
      // 验证码加入操作
      this.setData({
        codeS: false
      })
    }
  },
  // 群加入提示
  addQunShow () {
    this.setData({
      addQS: false
    })
    if (this.data.qunInfo.adding_modality * 1 === 3) {
      return this.setData({
        codeS: true
      })
    }
    this.joninQun()
    // todo 加入社群的下一步
  },
  // 加入群
  addQun () {
    this.setData({
      addQS: true
    })
  },
  // 消息详情
  goDetail () {
    app.setToast(this, {content: '您需要先加入社群哦~'})
    // app.gn(`../qunMessageDetail/qunMessageDetail?id=${e.currentTarget.dataset.id}`)
  },
  // 返回
  back () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 文章操作显示
  showOp (e) {
    if (e.currentTarget.dataset.index * 1 === this.data.chooseIndex * 1) {
      this.setData({
        chooseIndex: -1
      })
    } else {
      this.setData({
        chooseIndex: e.currentTarget.dataset.index
      })
    }
  },
  // 导航选择
  chooseNav (e) {
    this.setData({
      navChoose: e.currentTarget.dataset.index
    })
    this.getQunDetail(this.data.id, this.data.navArrSort[e.currentTarget.dataset.index])
  },
  // 创建名片弹窗
  mpOp (e) {
    if (e.currentTarget.dataset.type === 'back') {
      this.setData({
        showCreateMP: false
      })
    } else {
      app.gn(`../createNameCard/createNameCard`)
    }
  },
  // 去到用户的名片页
  goUserMp (e) {
    this.setData({
      showCreateMP: true
    })
    // todo 判断用户自己是否有名片
    // app.gn(`../nameCard/nameCard?id=${e.currentTarget.dataset.id}`)
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
  // 前往通讯录
  goAddressList () {
    if (this.data.qunInfo.is_default_group * 1 === 1) {
      return app.setToast(this, {content: '该群不接受查看通讯录资料'})
    } else if (this.data.qunInfo.mail_list * 1 === 1) {
      return app.setToast(this, {content: '抱歉，需要加入本群后方可查看群通讯录'})
    }
    app.gn(`../addressList/addressList?from=qunzhu&id=${this.data.qunInfo.group_id}&name=${this.data.qunInfo.group_name}`)
  },
  // 获取群信息
  getQunInfo (id) {
    let that = this
    app.wxrequest({
      url: useUrl.groupDetail,
      data: {
        session_key: app.gs(),
        group_id: id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          // 用户已加入本社群
          if (res.data.data.is_add_group * 1 === 1) {
            return wx.redirectTo({
              url: `../myQun/myQun?id=${res.data.data.group_id}`
            })
          }
          that.setData({
            qunInfo: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 用户加入社群
  joninQun () {
    let that = this
    app.wxrequest({
      url: useUrl.userAddGroup,
      data: {
        session_key: app.gs(),
        group_id: that.data.qunInfo.group_id,
        adding_code: that.data.code || '',
        recomend_user_id: that.data.recommendId || ''
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          app.setToast(that, {content: '加入成功'})
          setTimeout(() => {
            wx.redirectTo({
              url: `../myQun/myQun?id=${that.data.qunInfo.group_id}`
            })
          }, 1000)
        } else if (res.data.code === 402) {
          // 支付加入
          let obj = {
            success (res) {
              if (res.errMsg === 'requestPayment:ok') {
                // todo 支付成功
                app.setToast(that, {content: '加入成功'})
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
                // todo 支付失败
              }
              // console.log(res)
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
          return app.wxpay(obj)
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 验证码输入
  inputValue (e) {
    app.inputValue(e, this)
  },
  // 获取群内容
  getQunDetail (id, sort, page = 1) {
    let that = this
    app.wxrequest({
      url: useUrl.getGroupFriendCircleLists,
      data: {
        session_key: app.gs(),
        group_id: id,
        page,
        sort
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          if (page === 1) {
            that.setData({
              page: 1,
              infoArr: []
            })
          }
          // console.log(res.data.data)
          app.setMore(res.data.data, that)
          that.setData({
            infoArr: that.data.infoArr.concat(res.data.data)
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 用户对应的操作，打赏，点赞，评论
  commentOp (e) {
    let { type, index } = e.currentTarget.dataset
    if (type === 'ds') {
      // this.data.infoArr[index].id
      app.gn(`../nameCard/nameCard?id=${this.data.infoArr[index].user_id}&from=ds`)
      // 打赏
    } else {
      app.setToast(this, {content: '您需要先加入社群哦~'})
    }
  },
  //
  chooseRw () {
    app.setToast(this, {content: '您需要先加入社群哦~'})
  },
  // 获取群分享码
  shareQun () {
    let that = this
    app.wxrequest({
      url: useUrl.getGroupQrcode,
      data: {
        session_key: app.gs(),
        id: that.data.qunInfo.group_id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          let imgArr = []
          imgArr.push(res.data.data.group_qrcode)
          wx.previewImage({
            urls: imgArr
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
  onLoad (options) {
    console.log(options)
    if (options.scene) {
      let sceneArr = decodeURIComponent(options.scene).split(',')
      this.setData({
        recommendId: sceneArr[1].split('=')[1]
      })
      this.getQunInfo(sceneArr[0].split('=')[1])
      setTimeout(() => {
        this.getQunDetail(sceneArr[0].split('=')[1])
      }, 200)
      // console.log(sceneArr)
    } else {
      this.setData({
        group_id: options.group_id,
        recommendId: options.recommend_id
      })
      this.getQunInfo(options.id)
      setTimeout(() => {
        this.getQunDetail(options.id)
      }, 200)
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
