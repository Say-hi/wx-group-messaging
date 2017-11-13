// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 123,
    name: 'fasdfsad阿斯顿发生地方撒旦阿斯顿发撒旦',
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
        id: 234,
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
        top: 1,
        zan: 0 // 0 未赞 1 赞
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
        top: 1,
        zan: 1 // 0 未赞 1 赞
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
    chooseIndex: -1,
    show: false,
    qunList: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: '阿道夫阿道夫阿道夫阿道夫阿道夫阿道夫阿道夫阿道夫',
        permission: true,
        name: '阿斯顿发'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: '阿道夫',
        permission: false,
        name: '阿斯顿发'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: '阿道夫',
        permission: false,
        name: '阿斯顿发'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: '阿道夫阿道夫阿道夫阿道夫阿道夫阿道夫阿道夫阿道夫',
        permission: true,
        name: '阿斯顿发'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: '阿道夫',
        permission: false,
        name: '阿斯顿发'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: '阿道夫',
        permission: false,
        name: '阿斯顿发'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: '阿道夫阿道夫阿道夫阿道夫阿道夫阿道夫阿道夫阿道夫',
        permission: true,
        name: '阿斯顿发'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: '阿道夫',
        permission: false,
        name: '阿斯顿发'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: '阿道夫',
        permission: false,
        name: '阿斯顿发'
      }
    ],
    qunChooseIndex: 0,
    writeShow: false
  },
  // 用户对应的操作，打赏，点赞，评论
  commentOp (e) {
    let { type, index } = e.currentTarget.dataset
    if (type === 'ds') {
      // this.data.infoArr[index].id
      app.gn(`../nameCard/nameCard?id=${this.data.infoArr[index].id}&from=ds`)
      // 打赏
    } else if (type === 'dz') {
      if (this.data.infoArr[index].zan * 1 === 0) {
        this.data.infoArr[index].zan = 1
        this.data.infoArr[index].dzPeople.unshift({
          id: this.data.id,
          name: this.data.name
        })
      } else {
        this.data.infoArr[index].zan = 0
        this.data.infoArr[index].dzPeople = this.data.infoArr[index].dzPeople.slice(1)
      }
      this.setData({
        infoArr: this.data.infoArr
      })
      // 点赞
    } else if (type === 'pl') {
      // 评论
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
    this.showQun()
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
    // todo 判断用户是否可以发布群友圈
    this.setData({
      showRelease: true
    })
  },
  // 前往通讯录
  goAddressList () {
    app.gn(`../addressList/addressList?from=qunzhu`)
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
