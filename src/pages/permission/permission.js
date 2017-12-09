// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    permissionArr: [
      {
        l: '群友圈',
        r: '加入后可见'
      },
      {
        l: '通讯录',
        r: '加入后可见'
      },
      {
        l: '发群友圈要求',
        r: '默认'
      },
      {
        l: '群友圈内容限制',
        r: '默认'
      }
    ],
    fabuArr: [
      {
        l: '一天发布次数',
        r: '不限制'
      },
      {
        l: '要求推荐进群',
        r: '不限制'
      }
    ],
    contentArr: [
      {
        l: '文字',
        r: false
      },
      {
        l: '图片',
        r: false
      },
      {
        l: '语音',
        r: false
      },
      {
        l: '文章',
        r: false
      }
    ],
    arrOne: ['加入后可见', '所有人可见'],
    arrTwo: ['不限制', '1', '3', '5', '10'],
    showView: 'one'
  },
  // 第三页switch切换选择
  threeSwitchChange (e) {
    let contentArr = this.data.contentArr
    contentArr[e.currentTarget.dataset.index].r = e.detail.value
    this.setData({
      contentArr
    })
  },
  // 权限编辑
  edit (e) {
    let that = this
    let { index, type } = e.currentTarget.dataset
    if (type === 'one') {
      if (index * 1 === 2) {
        return that.setData({
          showView: 'two'
        })
      } else if (index * 1 === 3) {
        return that.setData({
          showView: 'three'
        })
      }
      wx.showActionSheet({
        itemList: that.data.arrOne,
        success (res) {
          that.data.permissionArr[index].r = that.data.arrOne[res.tapIndex] || that.data.permissionArr[index].r
          that.setData({
            permissionArr: that.data.permissionArr
          })
        }
      })
    } else if (type === 'two') {
      wx.showActionSheet({
        itemList: that.data.arrTwo,
        success (res) {
          that.data.fabuArr[index].r = that.data.arrTwo[res.tapIndex] || that.data.fabuArr[index].r
          that.setData({
            fabuArr: that.data.fabuArr
          })
        }
      })
    }
  },
  // 按钮操作
  btnEdit (e) {
    let {type} = e.currentTarget.dataset
    if (type === 'cancel') {
      return this.setData({
        showView: 'one'
      })
    } else if (type === 'oneConfirm') {
      wx.setStorageSync('permissionArr', this.data.permissionArr)
      return wx.navigateBack({
        delta: 1
      })
    } else if (type === 'twoConfirm') {
      wx.setStorageSync('fabuArr', this.data.fabuArr)
      this.data.permissionArr[2].r = '已设置'
    } else if (type === 'threeConfirm') {
      wx.setStorageSync('contentArr', this.data.contentArr)
      this.data.permissionArr[3].r = '已设置'
    }
    this.setData({
      showView: 'one',
      permissionArr: this.data.permissionArr
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.setData({
      permissionArr: app.gs('permissionArr') || this.data.permissionArr,
      fabuArr: app.gs('fabuArr') || this.data.fabuArr,
      contentArr: app.gs('contentArr') || this.data.contentArr
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
    let groupContentAstrict = []
    this.data.contentArr.forEach((v, i) => {
      if (v.r) {
        groupContentAstrict.push(i + 1)
      }
    })
    let obj = {
      group_friend_circle: this.data.permissionArr[0].r === '加入后可见' ? 1 : 2,
      mail_list: this.data.permissionArr[1].r === '加入后可见' ? 1 : 2,
      day_release: !app.gs('fabuArr') ? 0 : app.gs('fabuArr')[0].r === '不限制' ? 0 : parseInt(app.gs('fabuArr')[0].r),
      recommend_num: !app.gs('fabuArr') ? 0 : app.gs('fabuArr')[1].r === '不限制' ? 0 : parseInt(app.gs('fabuArr')[1].r),
      group_content_astrict: groupContentAstrict.toString()
    }
    wx.setStorageSync('createPermission', obj)
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
