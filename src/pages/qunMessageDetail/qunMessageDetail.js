// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
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
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          }
        ],
        userComment: [
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热犬瘟热犬瘟热犬瘟热犬瘟热犬瘟热犬瘟热犬瘟热',
            content: '阿斯顿发撒旦法阿斯顿发',
            r_name: '阿斯顿发阿斯顿发阿斯顿发阿斯顿发阿斯顿发'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热',
            content: '阿斯顿发'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热',
            content: '阿斯顿发撒旦法阿斯顿发',
            r_name: '阿斯顿发'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热',
            content: '阿斯顿发'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热',
            content: '阿斯顿发撒旦法阿斯顿发',
            r_name: '阿斯顿发'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热',
            content: '阿斯顿发'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热',
            content: '阿斯顿发撒旦法阿斯顿发',
            r_name: '阿斯顿发'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
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
        dzPeople: [
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          }
        ],
        userComment: [
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热',
            content: '阿斯顿发撒旦法阿斯顿发',
            r_name: '阿斯顿发'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热',
            content: '阿斯顿发'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热',
            content: '阿斯顿发撒旦法阿斯顿发',
            r_name: '阿斯顿发'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热',
            content: '阿斯顿发'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热',
            content: '阿斯顿发撒旦法阿斯顿发',
            r_name: '阿斯顿发'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热',
            content: '阿斯顿发'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热',
            content: '阿斯顿发撒旦法阿斯顿发',
            r_name: '阿斯顿发'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
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
        type: 2,
        image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '唐军',
        content: '发生的发生的',
        wzimg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        wztitle: '发生的发生的发生的发生的发生的发生的',
        address: '汇德商业',
        time: '2017-10-13 02:22',
        qun: '玩社群',
        dzPeople: [
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id: 123,
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          }
        ],
        userComment: [
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热',
            content: '阿斯顿发撒旦法阿斯顿发',
            r_name: '阿斯顿发'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热',
            content: '阿斯顿发'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热',
            content: '阿斯顿发撒旦法阿斯顿发',
            r_name: '阿斯顿发'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热',
            content: '阿斯顿发'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热',
            content: '阿斯顿发撒旦法阿斯顿发',
            r_name: '阿斯顿发'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热',
            content: '阿斯顿发'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热',
            content: '阿斯顿发撒旦法阿斯顿发',
            r_name: '阿斯顿发'
          },
          {
            img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            time: '2017-10-13 10:13',
            name: '犬瘟热',
            content: '阿斯顿发'
          }
        ],
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
