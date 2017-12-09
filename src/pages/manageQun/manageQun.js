// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [
      {
        l: '社群信息',
        r: '',
        type: 'info'
      },
      // {
      //   l: '权限设置',
      //   r: '',
      //   type: 'permission'
      // },
      // {
      //   l: '允许用户搜索到我的社群',
      //   r: false,
      //   type: 'search'
      // },
      // {
      //   l: '社群分类',
      //   r: '',
      //   type: 'classify'
      // },
      {
        l: '2',
        r: [
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            name: '啊啊'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            name: 'asdfasasfsad'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            name: '啊啊'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            name: '啊啊'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            name: '啊啊'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            name: 'asdfasasfsad'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            name: '啊啊'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            name: '啊啊'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            name: '啊啊'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            name: 'asdfasasfsad'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            name: '啊啊'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            name: '啊啊'
          }
        ],
        type: 'member'
      },
      {
        l: '设置管理员',
        r: '',
        type: 'setManger'
      },
      {
        l: '群主管理权转让',
        r: '',
        type: 'giveUp'
      }
    ],
    listArr: [],
    one: true,
    two: false,
    three: false,
    page: 1,
    manageArr: [],
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
  setMO (e) {
    this.setData({
      userId: e.currentTarget.dataset.id,
      showPermission: true
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
  // 设置权限
  setPermission () {
    let that = this
    app.wxrequest({
      url: useUrl.updateManagerAuthority,
      data: {
        session_key: app.gs(),
        group_id: that.data.groupId,
        id: that.data.userId,
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
  // 撤销\设置群管
  setManager (e) {
    let that = this
    this.setData({
      userId: e.currentTarget.dataset.id
    })
    app.wxrequest({
      url: useUrl.settingGroupMain,
      data: {
        session_key: app.gs(),
        id: e.currentTarget.dataset.id,
        is_manager_group: e.currentTarget.dataset.type === 'add' ? 1 : 0
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          if (e.currentTarget.dataset.type === 'add') {
            that.setData({
              showPermission: true
            })
          }
          that.setData({
            manageArr: [],
            listArr: []
          })
          that.getTXL(that.data.groupId, '')
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 群转让
  changeAdmin (e) {
    let that = this
    wx.showModal({
      title: '社群转让',
      content: '您确认要将此社群转让给他人，请谨慎操作，成功后无法取消！',
      cancelText: '容我三思',
      confirmText: '我意已决',
      success (res) {
        if (res.confirm) {
          app.wxrequest({
            url: useUrl.changeMainGroup,
            data: {
              session_key: app.gs(),
              group_id: that.data.groupId,
              id: e.currentTarget.dataset.id
            },
            success (res) {
              wx.hideLoading()
              if (res.data.code === 200) {
                wx.reLaunch({
                  url: '../index/index'
                })
              } else {
                app.setToast(that, {content: res.data.message})
              }
            }
          })
          // todo 执行社群转让操作
        }
      }
    })
  },
  // 设置管理员操作
  setM (e) {
    let { type } = e.currentTarget.dataset
    if (type === 'add') {
      this.setData({
        sAllS: true
      })
    } else if (type === 'del') {
      this.setData({
        sDelS: true
      })
    }
  },
  // 设置管理员返回
  sAllB () {
    this.setData({
      sAllS: false,
      sDelS: false
    })
  },
  // 第二页操作
  twoO (e) {
    let { type } = e.currentTarget.dataset
    if (type === 'cancel') {
      app.setBar('管理社群')
      this.setData({
        one: true,
        two: false,
        three: false
      })
    } else if (type === 'confirm') {
      app.setBar('管理社群')
      this.setData({
        one: true,
        two: false,
        three: false
      })
    }
  },
  // 管理社群操作
  edit (e) {
    let index = parseInt(e.currentTarget.dataset.index)
    if (index === 0) {
      if (this.data.myPer.is_info * 1 === 0) return app.setToast(this, {content: '您暂无群信息查看权限，请联系管理员'})
      app.gn(`../createQun/createQun?id=${this.data.groupId}&from=edit`)
      // wx.navigateTo({
      //   url: `../createQun/createQun?id=${this.data.groupId}&from=edit`
      // })
    } else if (index === 1) {
      let from = this.data.type === 'manager' ? 'qunguan' : 'qunzhu'
      app.gn(`../addressList/addressList?id=${this.data.groupId}&from=${from}&name=${this.data.name}`)
    } else if (index === 2) {
      if (this.data.type === 'manager') return app.setToast(this, {content: '您无此操作权限'})
      app.setBar('设置管理员')
      this.setData({
        one: false,
        two: true
      })
    } else if (index === 3) {
      if (this.data.type === 'manager') return app.setToast(this, {content: '您无此操作权限'})
      app.setBar('社群转让')
      this.setData({
        one: false,
        three: true
      })
    }
  },
  // 获取通讯录信息
  getTXL (id, name, page = 1) {
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
          for (let v of res.data.data) {
            if (parseInt(v.is_manager_group) === 1) {
              that.data.manageArr.push(v)
            }
          }
          that.setData({
            listArr: that.data.listArr.concat(res.data.data),
            manageArr: that.data.manageArr
          })
          if (that.data.more) {
            setTimeout(() => {
              that.getTXL(that.data.groupId, '', ++that.data.page)
            }, 200)
          }
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 删除社群
  delQun () {
    let that = this
    wx.showModal({
      title: '社群删除',
      content: '您确认要删除本社群吗？请谨慎选择。',
      cancelText: '我再想想',
      confirmText: '确认删除',
      success (res) {
        if (res.confirm) {
          app.wxrequest({
            url: useUrl.deleteGroupLists,
            data: {
              session_key: app.gs(),
              group_id: that.data.groupId
            },
            success (res) {
              wx.hideLoading()
              if (res.data.code === 200) {
                wx.reLaunch({
                  url: '../index/index'
                })
              } else {
                app.setToast(that, {content: res.data.message})
              }
            }
          })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.setData({
      groupId: options.id,
      type: options.type || '',
      name: options.name
    })
    this.getTXL(options.id, '')
    this.getMyPermission()
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
