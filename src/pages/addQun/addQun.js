// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'addQun',
    info: {
      bgImg: 'https://c.jiangwenqiang.com/api/group_user_bg.png',
      img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      name: '大法师阿斯顿发',
      type: '阿斯顿发生',
      content: '阿斯顿发撒旦法阿斯顿发撒旦法阿斯顿发撒旦法阿斯顿发撒旦法',
      alive: 1123,
      hot: 234,
      member: 2134,
      money: 123
    },
    navArr: ['最新', '点赞最多', '评论最多'],
    navChoose: 0,
    cur: 0,
    infoArr: [
      {
        type: 0,
        image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '唐军',
        content: '发生的发生的',
        contentImg: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
        ],
        dzPeople: [
          {
            id: 123,
            name: '犬瘟热'
          },
          {
            id: 123,
            name: '犬瘟热'
          },
          {
            id: 123,
            name: '犬瘟热'
          },
          {
            id: 123,
            name: '犬瘟热'
          },
          {
            id: 123,
            name: '犬瘟热'
          },
          {
            id: 123,
            name: '犬瘟热'
          }
        ],
        userComment: [
          {
            name: '犬瘟热',
            content: '阿斯顿发撒旦法阿斯顿发',
            r_name: '阿斯顿发'
          },
          {
            name: '犬瘟热',
            content: '阿斯顿发'
          },
          {
            name: '犬瘟热',
            content: '阿斯顿发撒旦法阿斯顿发',
            r_name: '阿斯顿发'
          },
          {
            name: '犬瘟热',
            content: '阿斯顿发'
          },
          {
            name: '犬瘟热',
            content: '阿斯顿发撒旦法阿斯顿发',
            r_name: '阿斯顿发'
          },
          {
            name: '犬瘟热',
            content: '阿斯顿发'
          }
        ],
        address: '汇德商业',
        time: '2017-10-13 02:22',
        qun: '玩社群',
        xin: 156132,
        talk: 5465464,
        top: 1
      },
      {
        type: 1,
        image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '唐军',
        content: '发生的发生的',
        contentImg: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
        ],
        address: '汇德商业',
        time: '2017-10-13 02:22',
        qun: '玩社群',
        xin: 156132,
        talk: 5465464,
        top: 1
      },
      {
        type: 2,
        image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '唐军',
        content: '发生的发生的',
        wzimg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        wztitle: '发生的发生的发生的发生的发生的发生的',
        address: '汇德商业',
        time: '2017-10-13 02:22',
        qun: '玩社群',
        xin: 156132,
        talk: 5465464,
        top: 1
      },
      {
        type: 0,
        image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '唐军',
        content: '发生的发生的',
        contentImg: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
        ],
        address: '汇德商业',
        time: '2017-10-13 02:22',
        qun: '玩社群',
        xin: 156132,
        talk: 5465464
      },
      {
        type: 1,
        image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '唐军',
        content: '发生的发生的',
        contentImg: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
        ],
        address: '汇德商业',
        time: '2017-10-13 02:22',
        qun: '玩社群',
        xin: 156132,
        talk: 5465464
      },
      {
        type: 2,
        image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '唐军',
        content: '发生的发生的',
        wzimg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        wztitle: '发生的发生的发生的发生的发生的发生的',
        address: '汇德商业',
        time: '2017-10-13 02:22',
        qun: '玩社群',
        xin: 156132,
        talk: 5465464
      }
    ],
    chooseIndex: -1
  },
  // 交流群展示
  jlqShow (e) {
    let { type } = e.currentTarget.dataset
    if (type === 'cancel') {
      this.setData({
        jlqS: false
      })
    } else if (type === 'confirm') {
      wx.previewImage({
        urls: ['../../images/']
      })
      this.setData({
        jlqS: false
      })
    }
  },
  // 验证码输入
  codeShow (e) {
    let { type } = e.currentTarget.dataset
    if (type === 'cancel') {
      this.setData({
        codeS: false
      })
    } else if (type === 'confirm') {
      // 验证码加入操作
      this.setData({
        codeS: false
      })
    }
  },
  // 群加入提示
  addQunShow () {
    this.setData({
      addQS: false
    })
    // todo 加入社群的下一步
  },
  // 加入群
  addQun () {
    this.setData({
      addQS: true
    })
  },
  // 消息详情
  goDetail (e) {
    app.gn(`../qunMessageDetail/qunMessageDetail?id=${e.currentTarget.dataset.id}`)
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
  },
  // 创建名片弹窗
  mpOp (e) {
    if (e.currentTarget.dataset.type === 'back') {
      this.setData({
        showCreateMP: false
      })
    } else {
      app.gn(`../createNameCard/createNameCard`)
    }
  },
  // 去到用户的名片页
  goUserMp (e) {
    this.setData({
      showCreateMP: true
    })
    // todo 判断用户自己是否有名片
    // app.gn(`../nameCard/nameCard?id=${e.currentTarget.dataset.id}`)
  },
  // 显示公众号弹窗
  showGzh () {
    // app.setGzh(this,{image: '', name: '', addname: '阿斯顿发撒旦法'})
    app.setGzh(this)
  },
  // 关闭公众号弹窗
  closeGzh () {
    app.closeGzh(this)
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
