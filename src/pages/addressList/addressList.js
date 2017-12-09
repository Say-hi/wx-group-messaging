// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    getIn: true,
    focus: false,
    qunChooseIndex: 0,
    permissionArr: [
      {
        t: '社群信息',
        v: false
      },
      {
        t: '权限设置',
        v: false
      },
      {
        t: '置顶消息',
        v: false
      },
      {
        t: '删除群友',
        v: false
      }
    ]
  },
  // 设置权限
  setPermission () {
    let that = this
    app.wxrequest({
      url: useUrl.updateManagerAuthority,
      data: {
        session_key: app.gs(),
        group_id: that.data.id,
        id: that.data.listArr[that.data.peopleIndex].id,
        is_info: that.data.permissionArr[0].v ? 1 : 0,
        is_setting: that.data.permissionArr[1].v ? 1 : 0,
        is_top: that.data.permissionArr[2].v ? 1 : 0,
        is_delete: that.data.permissionArr[3].v ? 1 : 0
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            showPermission: false
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // switch开关操作
  switchC (e) {
    // todo
    let index = e.currentTarget.dataset.index
    let value = e.detail.value
    this.data.permissionArr[index].v = value
    this.setData({
      permissionArr: this.data.permissionArr
    })
  },
  // 切换群显示
  changeQun (e) {
    this.setData({
      from: e.currentTarget.dataset.qunzhu * 1 === 1 ? 'qunzhu' : e.currentTarget.dataset.qunguan * 1 === 1 ? 'qunguan' : 'member',
      id: e.currentTarget.dataset.id,
      qunChooseIndex: e.currentTarget.dataset.index
    })
    this.getTXL(e.currentTarget.dataset.id, '', 1)
    this.showQun()
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
    // if (num >= 6) {
    //   this.setData({
    //     height: 390,
    //     heights: 390
    //   })
    // } else if (num === 0) {
    //   this.setData({
    //     height: 40,
    //     heights: 40
    //   })
    // } else {
    //   this.setData({
    //     height: 40 + (num * 62),
    //     heights: 40 + (num * 62)
    //   })
    // }
    let that = this
    wx.createSelectorQuery().select('#b-s-c-w').boundingClientRect((res) => {
      if (num === 1) {
        that.setData({
          height: 0,
          heights: res.height
        })
        // that.getHeight()
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
  // 失去焦点
  outBlur (e) {
    if (e.detail.value.trim().length <= 0) {
      this.setData({
        getIn: true,
        focus: false
      })
    } else {
      this.getTXL(this.data.id, e.detail.value, 1)
      this.setData({
        value: e.detail.value
      })
      // todo search操作
    }
  },
  // 点击按钮
  searchTap () {
    this.setData({
      getIn: false,
      focus: true
    })
  },
  // 返回主界面相关页
  goBackIndexPage (e) {
    wx.switchTab({
      url: e.currentTarget.dataset.url
    })
  },
  // 群成员权限管理
  setManager (e) {
    let that = this
    let type = parseInt(e.currentTarget.dataset.qunguan)
    let top = parseInt(e.currentTarget.dataset.top)
    this.setData({
      peopleIndex: e.currentTarget.dataset.index
    })
    // 用户为群主
    if (this.data.from === 'qunzhu') {
      // todo 判断操作对象是否为群管
      if (type === 1) {
        // 是群管
        wx.showActionSheet({
          itemList: top === 1 ? ['取消群管', '设置权限', '取消置顶', '删除'] : ['取消群管', '设置权限', '置顶', '删除'],
          success (res) {
            let index = parseInt(res.tapIndex)
            if (index === 0) {
              // todo 取消群管权限
              that.setManagerPermission(e, 0)
            } else if (index === 1) {
              // todo 设置权限
              that.setData({
                showPermission: true
              })
            } else if (index === 2) {
              that.setTop(e, top)
              // todo 置顶用户
            } else if (index === 3) {
              that.delUser(e.currentTarget.dataset.id)
              // todo 删除用户
            }
          }
        })
      } else {
        // 不是群管
        wx.showActionSheet({
          itemList: top === 1 ? ['设为群管', '取消置顶', '删除'] : ['设为群管', '置顶', '删除'],
          success (res) {
            let index = parseInt(res.tapIndex)
            if (index === 0) {
              // todo 操作用户为群管
              that.setManagerPermission(e, 1)
            } else if (index === 2) {
              that.delUser(e.currentTarget.dataset.id)
              // todo 删除用户操作
            } else if (index === 1) {
              that.setTop(e, top)
              // todo 用户置顶操作
            }
          }
        })
      }
    } else if (this.data.from === 'qunguan') {
      // 无删除权限
      if (that.data.permission.is_delete * 1 === 0) return app.setToast(this, {content: '很抱歉，您无操作群员权限'})
      // 有删除权限
      wx.showActionSheet({
        itemList: ['删除'],
        success (res) {
          let index = parseInt(res.tapIndex)
          if (index === 0) {
            that.delUser(e.currentTarget.dataset.id)
          }
        }
      })
    }
  },
  goMessage () {
    wx.switchTab({
      url: '../message/message'
    })
  },
  // 权限按钮操作
  pBtnOp (e) {
    let { type } = e.currentTarget.dataset
    if (type === 'confirm') {
      this.setPermission()
    } else if (type === 'cancel') {
      this.setData({
        showPermission: false
      })
    }
  },
  // 获取通讯录信息
  getTXL (id, name, page) {
    let that = this
    app.wxrequest({
      url: useUrl.getMailLists,
      data: {
        session_key: app.gs(),
        group_id: id,
        user_name: name,
        page
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          app.setMore(res.data.data, that)
          if (page === 1) {
            that.data.listArr = []
            that.setData({
              page: 1
            })
          }
          that.setData({
            listArr: that.data.listArr.concat(res.data.data)
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
  // 设置群管权限
  setManagerPermission (e, type) {
    let that = this
    let {id, index} = e.currentTarget.dataset
    app.wxrequest({
      url: useUrl.settingGroupMain,
      data: {
        session_key: app.gs(),
        id,
        is_manager_group: type
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.data.listArr[index].is_manager_group = type
          that.setData({
            listArr: that.data.listArr
          })
          // 设置群管操作
          if (type === 1) {
            that.setData({
              showPermission: true
            })
          }
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 设置置顶
  setTop (e, top) {
    let that = this
    app.wxrequest({
      url: useUrl.settingGroupUserIsTop,
      data: {
        session_key: app.gs(),
        id: e.currentTarget.dataset.id,
        is_top: top * 1 === 1 ? 0 : 1
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.getTXL(that.data.id, '', 1)
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 去到用户的名片页
  goUserMp (e) {
    if (this.data.user.is_has_card * 1 === 0) {
      return this.setData({
        showCreateMP: true
      })
    }
    // todo 判断用户自己是否有名片
    app.gn(`../nameCard/nameCard?id=${e.currentTarget.dataset.id}`)
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
  // 删除用户
  delUser (id) {
    let that = this
    app.wxrequest({
      url: useUrl.deleteMailUser,
      data: {
        session_key: app.gs(),
        id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.getTXL(that.data.id, '', 1)
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取管理权限
  getPermission (e) {
    if (!this.data.permission) {
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
              permission: res.data.data
            })
            that.setManager(e)
          } else {
            app.setToast(that, {content: res.data.message})
          }
        }
      })
    } else {
      this.setManager(e)
    }
  },
  // 分享
  onShareAppMessage () {
    return {
      title: `您的好友向您推荐社群【${this.data.name}】,快来加入吧`,
      path: `/pages/addQun/addQun?id=${this.data.id}`
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.setData({
      from: options.from,
      id: options.id,
      name: options.name
    })
    this.getTXL(options.id, '', 1)
    setTimeout(() => {
      this.getMyQunLists(options.id)
    }, 300)
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
    // this.getHeight()
    app.gML(this)
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
  onReachBottom () {
    if (this.data.more) {
      this.getTXL(this.data.id, this.data.value, ++this.data.page)
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
