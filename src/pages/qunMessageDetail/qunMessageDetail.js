// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cur: 0,
    infoDetail: {},
    chooseIndex: -1
  },
  // 分享进入确认是否加群
  checkAdd () {
    if (this.data.is_add_group * 1 === 0) {
      app.setToast(this, {content: '您还没有加入此群,为您跳转加入社群'})
      setTimeout(() => {
        app.gn(`../addQun/addQun?id=${this.data.group_id}`)
      }, 1000)
      return
    }
  },
  // 用户回复评论
  chooseRw (e) {
    this.checkAdd()
    if (e.currentTarget.dataset.userid * 1 === this.data.user.user_id * 1) {
      return app.setToast(this, {content: '不能回复自己'})
    } else if (this.data.infoDetail.is_comment * 1 === 0) {
      return app.setToast(this, {content: '抱歉,该群友圈不可评论'})
    }
    this.setData({
      rwComment: true,
      chooseReplayName: e.currentTarget.dataset.name,
      chooseReplayId: e.currentTarget.dataset.userid,
      cId: e.currentTarget.dataset.cid
    })
  },
  // 用户发表评论
  writeComment (e) {
    this.checkAdd()
    let that = this
    if (!e.detail.value || !e.detail.value.trim()) {
      console.log('无内容提交')
      that.setData({
        wComment: false,
        rwComment: false,
        chooseIndex: -1,
        chooseReplayName: '',
        chooseReplayId: '',
        cId: ''
      })
    } else {
      app.wxrequest({
        url: useUrl.addComment,
        data: {
          session_key: app.gs(),
          gfc_id: that.data.id,
          content: e.detail.value,
          parent_id: that.data.cId || ''
        },
        success (res) {
          wx.hideLoading()
          if (res.data.code === 200) {
            // console.log(that.data.chooseIndex)
            // console.log(that.data.chooseIndexR)
            that.data.infoDetail.comments.push({
              user_avatar: that.data.user.avatar,
              nickname: that.data.user.usernickname,
              content: e.detail.value,
              user_id: that.data.user.user_id,
              parent_user_id: that.data.chooseReplayId || '',
              parent_nickname: that.data.chooseReplayName || ''
            })
            that.setData({
              infoDetail: that.data.infoDetail,
              wComment: false,
              rwComment: false,
              chooseIndex: -1,
              chooseReplayName: '',
              chooseReplayId: '',
              cId: ''
            })
          } else {
            app.setToast(that, {content: res.data.message})
            that.setData({
              wComment: false,
              rwComment: false,
              chooseIndex: -1,
              chooseReplayName: '',
              chooseReplayId: '',
              cId: ''
            })
          }
        }
      })
      // todo 提交评论
    }
  },
  // 点赞
  zanOp () {
    let that = this
    app.wxrequest({
      url: useUrl.addOrCancelLikes,
      data: {
        session_key: app.gs(),
        gfc_id: that.data.id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          if (that.data.infoDetail.is_likes * 1 === 0) {
            that.data.infoDetail.is_likes = 1
            that.data.infoDetail.likes[0].lists.unshift({
              user_id: that.data.user.user_id || '',
              avatar: that.data.user.avatar
            })
          } else {
            that.data.infoDetail.is_likes = 0
            for (const [i, v] of that.data.infoDetail.likes[0].lists.entries()) {
              if (v.user_id * 1 === that.data.user.user_id * 1) {
                that.data.infoDetail.likes[0].lists.splice(i, 1)
                break
              }
            }
          }
          that.setData({
            infoDetail: that.data.infoDetail,
            chooseIndex: -1
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 用户对应的操作，打赏，点赞，评论
  commentOp (e) {
    let { type } = e.currentTarget.dataset
    if (type === 'ds') {
      // this.data.infoDetail[index].id
      app.gn(`../nameCard/nameCard?id=${this.data.user_id}&from=ds`)
      // 打赏
    } else if (type === 'dz') {
      this.checkAdd()
      this.zanOp()
      // 点赞
    } else if (type === 'pl') {
      this.checkAdd()
      if (this.data.infoDetail.is_comment * 1 !== 1) {
        this.setData({
          chooseIndex: -1
        })
        return app.setToast(this, {content: '抱歉,该群友圈不可评论'})
      }
      this.setData({
        wComment: true
      })
      // 评论
    }
  },
  // 返回
  back () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 文章操作显示
  showOp () {
    if (this.data.chooseIndex === 1) {
      this.setData({
        chooseIndex: -1
      })
    } else {
      this.setData({
        chooseIndex: 1
      })
    }
  },
  // 获取内容详情
  getDetail (id) {
    let that = this
    app.wxrequest({
      url: useUrl.groupFriendCircleDetail,
      data: {
        session_key: app.gs(),
        id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          if (res.data.data.type * 1 === 3) {
            app.WP('article', 'html', res.data.data.article_content, that, 5)
          }
          that.setData({
            infoDetail: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 创建名片弹窗
  mpOp (e) {
    if (e.currentTarget.dataset.type === 'back') {
      this.setData({
        showCreateMP: false,
        showRelease: false
      })
    } else {
      app.gn(`../createNameCard/createNameCard`)
    }
  },
  // 去到用户的名片页
  goUserMp (e) {
    if (!this.data.is_has_card || this.data.is_has_card * 1 === 0) {
      return this.setData({
        showCreateMP: true
      })
    } else {
      app.gn(`../nameCard/nameCard?id=${e.currentTarget.dataset.id || this.data.user_id}`)
    }
  },
  // 获取个人名片权限
  getUserNameCard () {
    let that = this
    app.wxrequest({
      url: useUrl.userCenterInfo,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            is_has_card: res.data.data.is_has_card || 0
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取用户个人详情
  getUserDetail () {
    let that = this
    app.wxrequest({
      url: useUrl.userInfoDetail,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          let user = {}
          Object.assign(user, res.data.data)
          user['usernickname'] = user.nickname
          delete user.nickname
          that.setData({
            user
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取社群详情
  getQunDetail (id) {
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
          that.setData({
            is_add_group: res.data.data.is_add_group
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 预览图片
  previewImage (e) {
    app.showImg(e, this.data.infoDetail.images)
  },
  // 获取群分享码
  shareQun () {
    let that = this
    app.wxrequest({
      url: useUrl.getGroupQrcode,
      data: {
        session_key: app.gs(),
        id: that.data.group_id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          wx.previewImage({
            urls: [res.data.data.group_qrcode]
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 播放语音
  playVoice () {
    let that = this
    wx.downloadFile({
      url: that.data.infoDetail.audio_url,
      success (res) {
        wx.playVoice({
          filePath: res.tempFilePath
        })
      }
    })
  },
  // 分享社群
  onShareAppMessage () {
    return {
      title: `您的好友向您分享群友圈,快来看看吧`,
      path: `/pages/qunMessageDetail/qunMessageDetail?id=${this.data.id}&user_id=${this.data.user_id}&group_id=${this.data.group_id}&from=share`
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.setData({
      id: options.id,
      user_id: options.user_id,
      group_id: options.group_id,
      type: options.type
    })
    this.getDetail(options.id)
    this.getUserDetail()
    if (options.from === 'share') {
      this.getQunDetail(options.group_id)
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
    this.getUserNameCard()
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
