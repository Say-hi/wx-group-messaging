// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    customItem: '全部',
    userInfo: [
      {
        l: '头像',
        r: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        type: 'img'
      },
      {
        l: '姓名',
        r: '阿斯顿发生大',
        type: 'name'
      },
      {
        l: '性别',
        r: '男',
        type: 'gender'
      },
      {
        l: '年龄段',
        r: '80后',
        type: 'age'
      },
      {
        l: '地区',
        r: ['广东省', '广州市', '天河区'],
        type: 'area'
      },
      {
        l: '职业',
        r: '销售',
        type: 'job'
      },
      {
        l: '手机',
        r: '18855953417',
        type: 'phone'
      },
      {
        l: '微信号',
        r: 'asdf5464',
        type: 'wechat'
      },
      {
        l: '个性签名',
        r: '阿迪法撒旦飞洒地方',
        type: 'sign'
      }
    ],
    number: [
      {
        l: '职业',
        r: '销售',
        type: 'job'
      },
      {
        l: '手机',
        r: '18855953417',
        type: 'phone'
      },
      {
        l: '微信号',
        r: 'asdf5464',
        type: 'wechat'
      },
      {
        l: '个性签名',
        r: '阿迪法撒旦飞洒地方',
        type: 'sign'
      }
    ],
    checked: false,
    chooseIndex: null,
    show: false,
    value: '',
    ageArr: ['60后', '70后', '80后', '90后', '00后', '10后'],
    genderArr: ['男', '女']
  },
  // 确认
  confirm () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 地区切换
  bindRegionChange (e) {
    this.data.userInfo[4].r = e.detail.value
    this.setData({
      userInfo: this.data.userInfo
    })
  },
  // 开关切换
  switchChange (e) {
    this.data.checked = e.detail.value
  },
  // 用户操作
  edit (e) {
    let that = this
    let { type, index } = e.currentTarget.dataset
    let { userInfo } = this.data
    if (type === 'img') {
      wx.chooseImage({
        count: 1,
        success (res) {
          // todo 上传图片
          userInfo[0].r = res.tempFilePaths[0]
          that.setData({
            userInfo
          })
        }
      })
    } else if (type === 'name' || type === 'job' || type === 'phone' || type === 'sign' || type === 'wechat') {
      this.setData({
        show: true,
        chooseIndex: index,
        value: ''
      })
    } else if (type === 'age') {
      wx.showActionSheet({
        itemList: that.data.ageArr,
        success (res) {
          that.data.userInfo[index].r = that.data.ageArr[res.tapIndex] || that.data.userInfo[index].r
          that.setData({
            userInfo: that.data.userInfo
          })
        }
      })
    } else if (type === 'gender') {
      wx.showActionSheet({
        itemList: that.data.genderArr,
        success (res) {
          that.data.userInfo[index].r = that.data.genderArr[res.tapIndex] || that.data.userInfo[index].r
          that.setData({
            userInfo: that.data.userInfo
          })
        }
      })
    }
  },
  // 内容输入
  inputValue (e) {
    this.data.value = e.detail.value
    this.data.hasIn = true
  },
  // 填写弹窗操作
  btnChoose (e) {
    if (e.currentTarget.dataset.type === 'confirm' && this.data.hasIn) {
      if (!this.data.value) {
        return app.setToast(this, {content: '未填写内容'})
      }
      this.data.userInfo[this.data.chooseIndex].r = this.data.value
      this.setData({
        userInfo: this.data.userInfo
      })
    }
    this.setData({
      show: false,
      hasIn: false
    })
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
