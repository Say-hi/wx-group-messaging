// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    leftArr: [
      '移动互联网',
      '电子商务',
      '社交网络',
      '企业服务',
      '信息安全',
      '数据服务',
      '智能硬件',
      '广告传媒',
      '传媒',
      '房地产',
      '文化娱乐',
      '游戏',
      '餐饮',
      '金融理财',
      '教育培训',
      '票务',
      '政务民生',
      '法务咨询',
      '医疗健康',
      '美容健身',
      '交通餐饮',
      '物流服务',
      '招聘',
      '其他'
    ],
    rightArr: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: 'asdf',
        hold: 'asdfa'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: 'asdf',
        hold: 'asdfa'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: 'owqerqwerqpwoeruiqpoeruqweopriuqweoruwqerpoiwequr',
        hold: 'asdfa'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: 'asdf',
        hold: 'asdfa'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: 'asdf',
        hold: 'asdfa'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: 'asdf',
        hold: 'asdfa'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: 'owqerqwerqpwoeruiqpoeruqweopriuqweoruwqerpoiwequr',
        hold: 'asdfa'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: 'asdf',
        hold: 'asdfa'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: 'asdf',
        hold: 'asdfa'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: 'asdf',
        hold: 'asdfa'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: 'owqerqwerqpwoeruiqpoeruqweopriuqweoruwqerpoiwequr',
        hold: 'asdfa'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: 'asdf',
        hold: 'asdfa'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: 'asdf',
        hold: 'asdfa'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: 'asdf',
        hold: 'asdfa'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: 'owqerqwerqpwoeruiqpoeruqweopriuqweoruwqerpoiwequr',
        hold: 'asdfa'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        qun_name: 'asdf',
        hold: 'asdfa'
      }
    ],
    chooseIndex: 0
  },
  // 左侧选择
  chooseI (e) {
    this.setData({
      chooseIndex: e.currentTarget.dataset.index
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
