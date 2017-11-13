// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    getIn: true,
    focus: false,
    listArr: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '撒旦发射撒旦发射撒旦发射撒旦发射撒旦发射撒旦发射撒旦发射撒旦发射撒旦发射',
        company: '阿斯顿发',
        job: '阿斯顿发',
        qunzhu: true,
        qunguan: false
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '撒旦发射',
        company: '阿斯顿发',
        job: '阿斯顿发',
        qunzhu: false,
        qunguan: true
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '撒旦发射',
        company: '阿斯顿发',
        job: '阿斯顿发',
        qunzhu: false,
        qunguan: false
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '撒旦发射',
        company: '阿斯顿发',
        job: '阿斯顿发',
        qunzhu: false,
        qunguan: false
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '撒旦发射撒旦发射撒旦发射撒旦发射撒旦发射撒旦发射撒旦发射撒旦发射撒旦发射',
        company: '阿斯顿发',
        job: '阿斯顿发',
        qunzhu: true,
        qunguan: false
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '撒旦发射',
        company: '阿斯顿发',
        job: '阿斯顿发',
        qunzhu: false,
        qunguan: true
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '撒旦发射',
        company: '阿斯顿发',
        job: '阿斯顿发',
        qunzhu: false,
        qunguan: false
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '撒旦发射',
        company: '阿斯顿发',
        job: '阿斯顿发',
        qunzhu: false,
        qunguan: false
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '撒旦发射撒旦发射撒旦发射撒旦发射撒旦发射撒旦发射撒旦发射撒旦发射撒旦发射',
        company: '阿斯顿发',
        job: '阿斯顿发',
        qunzhu: true,
        qunguan: false
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '撒旦发射',
        company: '阿斯顿发',
        job: '阿斯顿发',
        qunzhu: false,
        qunguan: true
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '撒旦发射',
        company: '阿斯顿发',
        job: '阿斯顿发',
        qunzhu: false,
        qunguan: false
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '撒旦发射',
        company: '阿斯顿发',
        job: '阿斯顿发',
        qunzhu: false,
        qunguan: false
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '撒旦发射撒旦发射撒旦发射撒旦发射撒旦发射撒旦发射撒旦发射撒旦发射撒旦发射',
        company: '阿斯顿发',
        job: '阿斯顿发',
        qunzhu: true,
        qunguan: false
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '撒旦发射',
        company: '阿斯顿发',
        job: '阿斯顿发',
        qunzhu: false,
        qunguan: true
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '撒旦发射',
        company: '阿斯顿发',
        job: '阿斯顿发',
        qunzhu: false,
        qunguan: false
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '撒旦发射',
        company: '阿斯顿发',
        job: '阿斯顿发',
        qunzhu: false,
        qunguan: false
      }
    ],
    qunChooseIndex: 0,
    permissionArr: [
      {
        t: '社群信息',
        v: true
      },
      {
        t: '权限设置',
        v: true
      },
      {
        t: '置顶消息',
        v: true
      },
      {
        t: '删除群友',
        v: true
      }
    ]
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
      qunChooseIndex: e.currentTarget.dataset.index
    })
    this.showQun()
  },
  // 展示群
  showQun () {
    this.setData({
      show: !this.data.show
    })
    if (this.data.show) {
      this.setData({
        height: 0
      })
    } else {
      this.setData({
        height: this.data.heights
      })
    }
  },
  // 获取所需移动的高度
  getHeight () {
    let that = this
    wx.createSelectorQuery().select('#b-s-c-w').boundingClientRect((res) => {
      that.setData({
        height: res.height,
        heights: res.height
      })
    }).exec()
  },
  // 创建群
  goCreateQun () {
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
    // 用户为群主
    if (this.data.from === 'qunzhu') {
      // todo 判断操作对象是否为群管
      // 不是群管
      wx.showActionSheet({
        itemList: ['设为群管', '删除', '置顶'],
        success (res) {
          let index = parseInt(res.tapIndex)
          if (index === 0) {
            // todo 操作用户为群管
          } else if (index === 1) {
            // todo 删除用户操作
          } else if (index === 2) {
            // todo 用户置顶操作
          }
        }
      })
      // 是群管
      wx.showActionSheet({
        itemList: ['取消群管', '设置权限', '删除'],
        success (res) {
          let index = parseInt(res.tapIndex)
          if (index === 0) {
            // todo 取消群管权限
          } else if (index === 1) {
            // todo 设置权限
            that.setData({
              showPermission: true
            })
          } else if (index === 2) {
            // todo 删除用户
          }
        }
      })
    } else if (this.data.from === 'qunguan') {
      // todo 判断群管的权限
      // 有删除权限
      wx.showActionSheet({
        itemList: ['删除'],
        success (res) {
          let index = parseInt(res.tapIndex)
          if (index === 0) {
            // todo 删除用户
          }
        }
      })
      // 无权限
      app.setToast(this, {content: '很抱歉，您无操作权限'})
    }
  },
  // 权限按钮操作
  pBtnOp (e) {
    let { type } = e.currentTarget.dataset
    if (type === 'confirm') {

    } else if (type === 'cancel') {
      this.setData({
        showPermission: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    this.setData({
      from: params.from
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
    this.getHeight()
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
