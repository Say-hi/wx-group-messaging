// 获取全局应用程序实例对象
const app = getApp()

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
      {
        l: '权限设置',
        r: '',
        type: 'permission'
      },
      {
        l: '允许用户搜索到我的社群',
        r: false,
        type: 'search'
      },
      {
        l: '社群分类',
        r: '',
        type: 'classify'
      },
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
    one: true,
    two: false,
    three: false,
    manageArr: [
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
      }
    ]
  },
  changeAdmin (e) {
    // let { id } = e.currentTarget.dataset
    wx.showModal({
      title: '社群转让',
      content: '您确认要将此社群转让给他人，请谨慎操作，成功后无法取消！',
      cancelText: '容我三思',
      confirmText: '我意已决',
      success (res) {
        if (res.confirm) {
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
    console.log(index)
    if (index === 0) {
      wx.navigateTo({
        url: `../createQun/createQun?id=${this.data.id}`
      })
    } else if (index === 1) {
      wx.navigateTo({
        url: `../permission/permission?id=${this.data.id}`
      })
    } else if (index === 3) {
      wx.navigateTo({
        url: `../classify/classify?id=${this.data.id}`
      })
    } else if (index === 5) {
      app.setBar('设置管理员')
      this.setData({
        one: false,
        two: true
      })
    } else if (index === 6) {
      app.setBar('社群转让')
      this.setData({
        one: false,
        three: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
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
