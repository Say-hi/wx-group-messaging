// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: {
      group: [
        {
          image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          group_name: '微商荣耀',
          name: '创建爱你人',
          has_op: 0,
          id: 123
        },
        {
          image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          group_name: '微商荣耀',
          name: '创建爱你人',
          has_op: 1,
          id: 432
        }
      ]
    },
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
    }
  },
  // 选择导航栏
  chooseNav (e) {
    if (e.currentTarget.dataset.type * 1 === this.data.cur) return
    this.setData({
      cur: e.currentTarget.dataset.type
    })
  },
  // 获取首页公告
  getGonggaoLists () {
    let that = this
    app.wxrequest({
      url: useUrl.getGonggaoLists,
      data: {
        session_key: app.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            notice: res.data.data
          })
          let i = 1
          setInterval(() => {
            if (i >= res.data.data.length) i = 0
            that.setData({
              curNotice: i
            })
            i++
          }, 5000)
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
    app.gn('../createQun/createQun')
  },
  // 社群操作
  qunOp (e) {
    let {index, op, id} = e.currentTarget.dataset
    console.log(index)
    // 无操作权限
    if (parseInt(op) === 0) {
      wx.showActionSheet({
        itemList: ['进入社群', '置顶', '退出社群'],
        success (res) {
          if (res.tapIndex === 0) {
            app.gn(`../myQun/myQun?id=${id}`)
          } else if (res.tapIndex === 1) {
            // todo 置顶操作
          } else if (res.tapIndex === 2) {
            // todo 退出操作
          }
        }
      })
    } else {
      wx.showActionSheet({
        itemList: ['进入社群', '置顶', '管理'],
        success (res) {
          if (res.tapIndex === 0) {
            app.gn(`../myQun/myQun?id=${id}`)
          } else if (res.tapIndex === 1) {
            // todo 置顶操作
          } else if (res.tapIndex === 2) {
            // todo 进入管理操作
          }
        }
      })
    }
  },
  // 跳转搜索页面
  goSearch () {
    app.gn('../search/search')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getGonggaoLists()
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
  },
  // 触底加载更多
  onReachBottom () {

  }
})
