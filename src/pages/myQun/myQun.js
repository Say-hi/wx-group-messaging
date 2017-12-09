// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navArr: ['最新', '点赞最多', '评论最多'],
    navArrSort: ['add_tiem', 'likes_num', 'comment_num'],
    navChoose: 0,
    cur: 0,
    infoArr: [],
    chooseIndex: -1,
    show: false,
    qunChooseIndex: 0,
    writeShow: false
  },
  // // 提交评论执行
  // upComment (index) {
  //   let that = this
  //   app.wxrequest({
  //     url: useUrl.addComment,
  //     data: {
  //       session_key: app.gs(),
  //       gfc_id: that.data.infoArr[index].id,
  //       content:
  //     }
  //   })
  // },
  // 点赞操作执行
  zanOp (index) {
    let that = this
    app.wxrequest({
      url: useUrl.addOrCancelLikes,
      data: {
        session_key: app.gs(),
        gfc_id: that.data.infoArr[index].id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          if (that.data.infoArr[index].is_likes * 1 === 0) {
            that.data.infoArr[index].is_likes = 1
            that.data.infoArr[index].likes[0].lists.unshift({
              user_id: that.data.user.userid || '',
              nickname: that.data.user.usernickname
            })
          } else {
            that.data.infoArr[index].is_likes = 0
            for (const [i, v] of that.data.infoArr[index].likes[0].lists.entries()) {
              if (v.user_id * 1 === that.data.user.userid * 1) {
                that.data.infoArr[index].likes[0].lists.splice(i, 1)
                break
              }
            }
          }
          that.setData({
            infoArr: that.data.infoArr,
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
    let { type, index } = e.currentTarget.dataset
    console.log(index)
    if (type === 'ds') {
      // this.data.infoArr[index].id
      app.gn(`../nameCard/nameCard?id=${this.data.infoArr[index].user_id}&from=ds`)
      // 打赏
    } else if (type === 'dz') {
      this.zanOp(index)
      // 点赞
    } else if (type === 'pl') {
      if (this.data.infoArr[index].is_comment * 1 !== 1) {
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
  // 用户发表评论
  writeComment (e) {
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
          gfc_id: that.data.infoArr[(that.data.chooseIndex === -1 ? that.data.chooseIndexR : that.data.chooseIndex)].id,
          content: e.detail.value,
          parent_id: that.data.cId || ''
        },
        success (res) {
          wx.hideLoading()
          if (res.data.code === 200) {
            // console.log(that.data.chooseIndex)
            // console.log(that.data.chooseIndexR)
            that.data.infoArr[(that.data.chooseIndex === -1 ? that.data.chooseIndexR : that.data.chooseIndex)].comments.push({
              nickname: that.data.user.usernickname,
              content: e.detail.value,
              user_id: that.data.user.userid,
              parent_user_id: that.data.chooseReplayId || '',
              parent_nickname: that.data.chooseReplayName || ''
            })
            that.setData({
              infoArr: that.data.infoArr,
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
  // 用户回复评论
  chooseRw (e) {
    // console.log(e)
    // console.log('userid', e.currentTarget.dataset.userid)
    // console.log('ucindex', e.currentTarget.dataset.ucindex)
    // console.log(this.data.user.user_id)
    if (e.currentTarget.dataset.userid * 1 === this.data.user.userid * 1) {
      return app.setToast(this, {content: '不能回复自己'})
    } else if (this.data.infoArr[e.currentTarget.dataset.index].is_comment * 1 === 0) {
      return app.setToast(this, {content: '抱歉,该群友圈不可评论'})
    }
    this.setData({
      rwComment: true,
      chooseIndexR: e.currentTarget.dataset.index,
      chooseReplayName: e.currentTarget.dataset.name,
      chooseReplayId: e.currentTarget.dataset.userid,
      cId: e.currentTarget.dataset.cid
    })
  },
  // 去到用户的名片页
  goUserMp (e) {
    if (this.data.is_has_card * 1 === 0) {
      return this.setData({
        showCreateMP: true
      })
    } else {
      app.gn(`../nameCard/nameCard?id=${e.currentTarget.dataset.id}`)
    }
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
  // 切换群显示
  changeQun (e) {
    this.setData({
      qunChooseIndex: e.currentTarget.dataset.index
    })
    this.getQunInfo(e.currentTarget.dataset.id)
    this.getQunDetail(e.currentTarget.dataset.id, 'add_tiem', 1)
    this.showQun()
  },
  // 消息详情
  goDetail (e) {
    // if (e.currentTarget.dataset.type === 'wz') {
    //   return wx.redirectTo({
    //     url: `../qunMessageDetail/qunMessageDetail?id=${e.currentTarget.dataset.id}&user_id=${this.data.infoArr[e.currentTarget.dataset.index].user_id}&group_id=${this.data.qunInfo.group_id}&type=wz`
    //   })
    //   // app.gn(`../qunMessageDetail/qunMessageDetail?id=${e.currentTarget.dataset.id}&user_id=${this.data.infoArr[e.currentTarget.dataset.index].user_id}&group_id=${this.data.qunInfo.group_id}&type=wz`)
    // }
    app.gn(`../qunMessageDetail/qunMessageDetail?id=${e.currentTarget.dataset.id}&user_id=${this.data.infoArr[e.currentTarget.dataset.index].user_id}&group_id=${this.data.qunInfo.group_id}`)
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
  // 展示群
  showQun () {
    this.setData({
      show: !this.data.show
    })
    if (this.data.show) {
      this.getHeight(1)
      // this.setData({
      //   height: 0
      // })
    } else {
      this.getHeight()
      // this.setData({
      //   height: this.data.heights
      // })
    }
  },
  // 获取所需移动的高度
  getHeight (num) {
    let that = this
    wx.createSelectorQuery().select('#b-s-c-w').boundingClientRect((res) => {
      if (num === 1) {
        that.setData({
          height: 0,
          heights: res.height
        })
      } else {
        that.setData({
          height: res.height,
          heights: res.height
        })
      }
    }).exec()
  },
  // 创建群
  goCreateQun () {
    for (let v of this.data.qunList) {
      if (v.is_main_group * 1 === 1) return app.setToast(this, {content: '每人只能创建一个社群哦'})
    }
    app.gn(`../createQun/createQun`)
  },
  // 返回主界面相关页
  goBackIndexPage (e) {
    wx.switchTab({
      url: e.currentTarget.dataset.url
    })
  },
  // 展示圆圈
  showrite () {
    this.setData({
      writeShow: !this.data.writeShow
    })
  },
  // 用户发布群友圈
  releaseQun () {
    if (this.data.qunInfo.recommend_num >= 1 && this.data.qunInfo.recommend_num > this.data.qunInfo.recommend_success_num) {
      return this.setData({
        showRelease: true
      })
    }
    app.gn(`../writeQun/writeQun?id=${this.data.qunInfo.group_id}`)
    // todo 判断用户是否可以发布群友圈
    // this.setData({
    //   showRelease: true
    // })
  },
  // 前往通讯录
  goAddressList () {
    let from = 'member'
    if (this.data.qunInfo.is_default_group * 1 === 1) {
      return app.setToast(this, {content: '该群不接受查看通讯录资料'})
    } else if (this.data.qunInfo.is_main_group * 1 === 1) {
      from = 'qunzhu'
    } else if (this.data.qunInfo.is_manager_group * 1 === 1) {
      from = 'qunguan'
    }
    app.gn(`../addressList/addressList?from=${from}&id=${this.data.qunInfo.group_id}&name=${this.data.qunInfo.group_name}`)
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
          if (parseInt(res.data.data.is_add_group) === 0) {
            return wx.redirectTo({
              url: `../addQun/addQun?id=${res.data.data.group_id}`
            })
          }
          that.setData({
            qunInfo: res.data.data,
            is_main_group: res.data.data.is_main_group
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取我的社群列表
  getMyQunLists (id) {
    let that = this
    app.wxrequest({
      url: useUrl.myselfGroupLists,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            qunList: res.data.data
          })
          for (const [i, v] of res.data.data.entries()) {
            if (parseInt(v.group_id) === parseInt(id)) {
              that.setData({
                qunChooseIndex: i
              })
              break
            }
          }
          setTimeout(() => {
            that.getHeight()
          }, 500)
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 分享社群
  onShareAppMessage () {
    return {
      title: `您的好友向您分享社群${this.data.qunInfo.group_name}`,
      path: `/pages/addQun/addQun?id=${this.data.qunInfo.group_id}&recommend_id=${this.data.user.userid}`
    }
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
          user['userid'] = user.user_id
          delete user.nickname
          delete user.user_id
          that.setData({
            user
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
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
  // 触底操作
  onReachBottom () {
    if (this.data.more) {
      this.getQunDetail(this.data.id, this.data.navArrSort[this.data.navChoose], ++this.data.page)
    }
  },
  // 延时请求接口
  getAll (id) {
    this.getQunInfo(id)
    setTimeout(() => {
      this.getMyQunLists(id)
    }, 200)
    setTimeout(() => {
      this.getUserDetail()
    }, 400)
    setTimeout(() => {
      this.getQunDetail(id, 'add_tiem')
    }, 800)
    setTimeout(() => {
      this.getMyPermission()
    }, 900)
  },
  // 获取自己的权限
  getMyPermission () {
    let that = this
    app.wxrequest({
      url: useUrl.managerAuthorityPage,
      data: {
        session_key: app.gs(),
        group_id: that.data.id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            setTop: parseInt(res.data.data.is_top) === 1 ? 'true' : ''
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取群分享码
  shareQun () {
    let that = this
    app.wxrequest({
      url: useUrl.getGroupQrcode,
      data: {
        session_key: app.gs(),
        id: that.data.id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          // let imgArr = []
          // imgArr.push(res.data.data.group_qrcode)
          // console.log(imgArr)
          wx.previewImage({
            urls: [res.data.data.group_qrcode]
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 设置群消息置顶
  setMessageTop (e) {
    let {index, id} = e.currentTarget.dataset
    console.log(index)
    let that = this
    app.wxrequest({
      url: useUrl.setTopFrinedCircle,
      data: {
        session_key: app.gs(),
        id: id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.data.infoArr[index].is_top = that.data.infoArr[index].is_top * 1 === 1 ? 0 : 1
          that.setData({
            infoArr: that.data.infoArr
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 删除群友圈
  delQun (e) {
    let that = this
    app.wxrequest({
      url: useUrl.deleteFriendCircle,
      data: {
        session_key: app.gs(),
        id: e.currentTarget.dataset.id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.data.infoArr.splice(e.currentTarget.dataset.index * 1, 1)
          that.setData({
            infoArr: that.data.infoArr
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  goMessage () {
    wx.switchTab({
      url: '../message/message'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.setData({
      id: options.id
    })
    // this.getUser(
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
    this.getAll(this.data.id)
    if (!this.data.is_has_card) {
      this.getUserNameCard()
    } else if (this.data.showCreateMP) {
      this.getUserNameCard()
    }
    app.gML(this)
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    this.setData({
      infoArr: []
    })
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
