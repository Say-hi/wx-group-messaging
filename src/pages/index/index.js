// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: [],
    cur: 0,
    recommendArr: [
      {
        image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        group_name: '微商荣耀',
        name: '创建爱你人'
      }
    ]
  },
  // 点击群下一步
  goNext (e) {
    if (e.currentTarget.dataset.cur * 1 === 0) {
      app.gn(`../addQun/addQun?id=${e.currentTarget.dataset.id}`)
    } else {
      wx.navigateToMiniProgram({
        appId: e.currentTarget.dataset.appid,
        extraData: {id: 123, title: 'I am coming'}
      })
    }
  },
  // 选择导航栏
  chooseNav (e) {
    if (e.currentTarget.dataset.type * 1 === this.data.cur) return
    if (e.currentTarget.dataset.type * 1 === 1) {
      if (!this.data.appList) {
        this.getAppList()
      }
    }
    this.setData({
      cur: e.currentTarget.dataset.type
    })
  },
  // 获取应用列表
  getAppList () {
    let that = this
    app.wxrequest({
      url: useUrl.indexApplicationLists,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            appList: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取我的社群列表
  getMyQunLists () {
    let that = this
    app.wxrequest({
      url: useUrl.myselfGroupLists,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        if (res.data.code === 200) {
          that.setData({
            user: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取热门社群列表
  getHotQun () {
    let that = this
    app.wxrequest({
      url: useUrl.indexHotGroup,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            hotQun: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 页面跳转
  jumpPage (e) {
    if (e.currentTarget.dataset.t === '速拼英语') {
      app.data.suPin = true
    } else if (e.currentTarget.dataset.t === '学科英语') {
      app.data.suPin = false
    }
    if (e.currentTarget.dataset.type === 'switchTab') {
      wx.switchTab({
        url: e.currentTarget.dataset.url
      })
    } else if (e.currentTarget.dataset.type === 'reLaunch') {
      wx.reLaunch({
        url: e.currentTarget.dataset.url
      })
    } else if (e.currentTarget.dataset.type === 'redirectTo') {
      wx.redirectTo({
        url: e.currentTarget.dataset.url
      })
    } else if (e.currentTarget.dataset.type === 'navigateTo') {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }
  },
  // 去到社群分类
  goClassify () {
    app.gn('../qunClassify/qunClassify')
  },
  // 创建社群
  create () {
    for (let v of this.data.user) {
      if (v.is_main_group * 1 === 1) return app.setToast(this, {content: '每人只能创建一个社群哦'})
    }
    app.gn('../createQun/createQun')
  },
  // 社群操作
  qunOp (e) {
    let that = this
    let {index, qunzhu, manager, id, top, name} = e.currentTarget.dataset
    console.log(name)
    if (parseInt(qunzhu) === 1) { // 群主权限
      wx.showActionSheet({
        itemList: parseInt(top) === 1 ? ['进入社群', '取消置顶', '管理'] : ['进入社群', '置顶', '管理'],
        success (res) {
          if (res.tapIndex === 0) {
            app.gn(`../myQun/myQun?id=${id}`)
          } else if (res.tapIndex === 1) {
            that.setTop(id, top)
            // todo 置顶操作
          } else if (res.tapIndex === 2) {
            return app.setToast(that, {content: '不提供此操作'})
            // app.gn(`../manageQun/manageQun?id=${id}&name=${name}`)
            // todo 进入管理操作
          }
        }
      })
    } else if (parseInt(manager) === 1) {
    // 管理权限
      wx.showActionSheet({
        itemList: parseInt(top) === 1 ? ['进入社群', '取消置顶', '管理', '退出社群'] : ['进入社群', '置顶', '管理', '退出社群'],
        success (res) {
          if (res.tapIndex === 0) {
            app.gn(`../myQun/myQun?id=${id}`)
          } else if (res.tapIndex === 1) {
            that.setTop(id, top)
            // todo 置顶操作
          } else if (res.tapIndex === 2) {
            return app.setToast(that, {content: '不提供此操作'})
            // app.gn(`../manageQun/manageQun?id=${id}&type=manager&name=${name}`)
            // todo 进入管理操作
          } else if (res.tapIndex === 3) {
            that.outQun(id, index)
            // todo 退出社群操作
          }
        }
      })
    } else { // 成员权限
      wx.showActionSheet({
        itemList: parseInt(top) === 1 ? ['进入社群', '取消置顶', '退出社群'] : ['进入社群', '置顶', '退出社群'],
        success (res) {
          if (res.tapIndex === 0) {
            app.gn(`../myQun/myQun?id=${id}`)
          } else if (res.tapIndex === 1) {
            that.setTop(id, top)
            // todo 置顶操作
          } else if (res.tapIndex === 2) {
            that.outQun(id, index)
            // todo 退出操作
          }
        }
      })
    }
  },
  // 设置群置顶\取消
  setTop (id, top) {
    let that = this
    app.wxrequest({
      url: useUrl.myselfGroupIsTop,
      data: {
        session_key: app.gs(),
        group_id: id,
        is_top: parseInt(top) === 0 ? 1 : 0
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.getMyQunLists()
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 跳转搜索页面
  goSearch () {
    app.gn('../search/search')
  },
  // 退出社群
  outQun (id, index) {
    let that = this
    if (this.data.user[index].is_default_group * 1 === 1) return app.setToast(this, {content: '该群不可退出！'})
    app.wxrequest({
      url: useUrl.tuichuGroup,
      data: {
        session_key: app.gs(),
        group_id: id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.getMyQunLists()
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 进入社群
  goDetail (e) {
    app.gn(`../myQun/myQun?id=${e.currentTarget.dataset.id}`)
  },
  goMessage () {
    wx.switchTab({
      url: '../message/message'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // this.getGonggaoLists()
    this.getMyQunLists()
    setTimeout(() => {
      this.getHotQun()
    }, 200)
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    setTimeout(() => {
      this.getMyQunLists()
      this.getHotQun()
    }, 300)
    // TODO: onPullDownRefresh
  },
  // 触底加载更多
  onReachBottom () {

  }
})
