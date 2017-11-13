// const wechat = require('./utils/wechat')
// const Promise = require('./utils/bluebird')
/*eslint-disable*/
const useUrl = require('./utils/service')
const wxParse = require('./wxParse/wxParse')
// const backgroundAudioManager = wx.getBackgroundAudioManager()
// let windowWidth = 375
// wx.getSystemInfo({
//   success (res) {
//     windowWidth = res.windowWidth - (( 2 * (res.windowWidth * 0.03)).toFixed(2))
//   }
// })
// // const currentThis = getCurrnetPages()[getCurrnetPages().length - 1]
// backgroundAudioManager.onTimeUpdate(() => {
//   let that = getCurrentPages()[getCurrentPages().length - 1]
//   let time = {
//     total: '',
//     passed: ''
//   }
//   time.total = backgroundAudioManager.duration
//   time.passed = backgroundAudioManager.currentTime
//   let barWidth = windowWidth * (time.passed) / time.total
//   if (!that.timeUp) return
//   getCurrentPages()[getCurrentPages().length - 1].timeUp(time, barWidth)
// })
// // 自然结束播放
// backgroundAudioManager.onEnded(() => {
//   let that = getCurrentPages()[getCurrentPages().length - 1]
//   if (that.data.time) {
//     that.data.time.passed = 0
//     that.setData({
//       bar_width: 0,
//       time: that.data.time,
//       play: false
//     })
//   }
//   if (that.data.showLists) {
//     if (that.data.curNavP >= that.data.showLists.length) return
//     if (that.curNavP * 1 === -1) {
//       that.playMusic(that.data.showLists[++that.data.curNavP].mp3, '单词连读')
//     }
//   }
// })
// // 人为结束播放
// backgroundAudioManager.onStop(() => {
//   let that = getCurrentPages()[getCurrentPages().length - 1]
//   if (that.data.time) {
//     that.data.time.passed = 0
//     that.setData({
//       bar_width: 0,
//       time: that.data.time,
//       play: false
//     })
//   }
//   if (that.data.showLists) {
//     if (that.data.curNavP >= that.data.showLists.length) return
//     if (that.curNavP * 1 === -1) {
//       that.playMusic(that.data.showLists[++that.data.curNavP].mp3, '单词连读')
//     }
//   }
// })
const Moment = require('./utils/moment')
Moment.locale('en', {
  relativeTime : {
    future: '差 %s',
    past:   '%s前',
    s:  '几秒',
    m:  '一分钟',
    mm: '%d分钟',
    h:  '一小时',
    hh: '%d小时',
    d:  '一天',
    dd: '%d天',
    M:  '一个月',
    MM: '%d月',
    y:  '一年',
    yy: '%d年'
  }
})
// moment.locale('zh-cn')
App({
  data: {
    suPin: true,
    name: '英语小程序'
  },
  // 富文本解析
  WP (title, type, data, that, image) {
    wxParse.wxParse(title, type, data, that, image)
  },
  // 解析时间
  moment (time) {
    return Moment(time, 'YYYYMMDD HH:mm:ss').fromNow()
  },
  // 发起微信支付
  wxpay (obj) {
    let objs = {
      timeStamp: obj.timeStamp,
      nonceStr: obj.nonceStr,
      package: obj.package,
      signType: obj.signType || 'MD5',
      paySign: obj.paySign,
      success: obj.success || function (res) {
        console.log('未传入success回调函数', res)
      },
      fail: obj.fail || function (err) {
        console.log('未传入fail回调函数,err:', err.errMsg)
      },
      complete: obj.complete || function () {}
    }
    wx.requestPayment(objs)
  },
  // 上传媒体文件
  wxUpload (obj) {
    let s = {
      url: obj.url,
      filePath: obj.filePath,
      name: obj.name || 'file',
      header: {
        'content-type' : 'multipart/form-data'
      },
      formData: obj.formData,
      success: obj.success || function (res) {
        console.log('未传入成功回调函数', res)
      },
      fail: obj.fail || function (res) {
        console.log('为传入失败回调函数', res)
      },
      complete: obj.complete || function () {}
    }
    wx.uploadFile(s)
  },
  // 请求数据
  wxrequest (obj) {
    wx.showLoading({
      title: '请求数据中...'
      // mask: true
    })
    wx.request({
      url: obj.url || useUrl.serviceUrl.login,
      method: obj.method || 'POST',
      data: obj.data || {},
      header: {
        'content-type': obj.header || 'application/x-www-form-urlencoded'
      },
      success: obj.success || function () {
        console.log('未传入success回调函数')
      },
      fail: obj.fail || function (err) {
        console.log('未传入fail回调函数,err:' + err.errMsg)
      },
      complete: obj.complete || function (res) {
        // sessionId 失效
        if (res.data.code === 401) {
          wx.login({
            success (res) {
              if (res.code) {
                wx.getUserInfo({
                  success (res2) {
                    that.wxrequest({
                      url: useUrl.login,
                      data: {
                        code: res.code,
                        iv: res2.iv,
                        encryptedData: res.encryptedData
                      },
                      success (res) {
                        wx.setStorageSync('session_key', res.data.data.session_key)
                        obj.data.session_key = that.gs()
                        that.wxrequest(obj)
                      }
                    })
                  }
                })
              } else {
                wx.showToast({
                  content: '请删除小程序后，重新打开并授权'
                })
              }
            }
          })
        }
      }
    })
  },
  // 用户登陆
  wxlogin (loginSuccess, params) {
    let that = this
    if (wx.getStorageSync('session_key')) {
      let checkObj = {
        url: useUrl.userCenter,
        data: {
          session_key: wx.getStorageSync('session_key')
        },
        success (res) {
          // session失效
          if (res.data.code === 400 && (res.data.message === 'session_key 已过期，请再次登陆！' || res.data.message === 'session_key 失效！')) {
            console.log('session_key失效')
            // 无条件获取登陆code
            wx.login({
              success (res) {
                // console.log(res)
                let code = res.code
                // 获取用户信息
                let obj = {
                  success (data) {
                    wx.setStorageSync('userInfo', data.userInfo)
                    let iv = data.iv
                    let encryptedData = data.encryptedData
                    // 获取session_key
                    let objs = {
                      url: useUrl.login,
                      data: {
                        recommend_id: params.id || 0,
                        code: code,
                        iv: iv,
                        encryptedData: encryptedData
                      },
                      success (res) {
                        // let session_key = 'akljgaajgoehageajnafe'
                        // console.log(res)
                        wx.setStorageSync('session_key', res.data.data.session_key)
                        // console.log(session)
                        if (loginSuccess) {
                          loginSuccess(params)
                        }
                      }
                    }
                    that.wxrequest(objs)
                  },
                  fail (res) {
                    console.log(res)
                    wx.showToast({
                      title: '您未授权小程序,请授权登陆'
                    })
                  }
                }
                that.getUserInfo(obj)
              },
              fail (err) {
                console.log('loginError' + err)
              }
            })
          } else {
            console.log('session_key有效')
            if (loginSuccess) {
              loginSuccess(params)
            }
          }
        }
      }
      that.wxrequest(checkObj)
    } else {
      // 无条件获取登陆code
      wx.login({
        success (res) {
          // console.log(res)
          let code = res.code
          // 获取用户信息
          let obj = {
            success (data) {
              wx.setStorageSync('userInfo', data.userInfo)
              let iv = data.iv
              let encryptedData = data.encryptedData
              // 获取session_key
              let objs = {
                url: useUrl.login,
                data: {
                  recommend_id: params.id || 0,
                  code,
                  iv,
                  encryptedData
                },
                success (session) {
                  // let s = 'DUGufWMOkMIolSIXLajTvCEvXAYQZwSpnafUVlSagdNEReVSRDAECzwEVAtFbPWg'
                  wx.setStorageSync('session_key', session.data.data.session_key)
                  // wx.setStorageSync('session_key', s)
                  if (loginSuccess) {
                    loginSuccess(params)
                  }
                }
              }
              that.wxrequest(objs)
            },
            fail () {
              wx.showToast({
                title: '您未授权小程序,请授权登陆'
              })
            }
          }
          that.getUserInfo(obj)
        },
        fail (err) {
          console.log('loginError' + err)
        }
      })
    }
  },
  // 获取缓存session_key
  gs (key) {
    return wx.getStorageSync(key || 'session_key')
  },
  // 设置页面是否加载
  setMore (params, that) {
    if (params.length === 0) {
      that.setData({
        more: false
      })
    } else {
      that.setData({
        more: true
      })
    }
  },
  // 获取用户信息
  getUserInfo (obj) {
    wx.getUserInfo({
      withCredentials: obj.withCredentials || true,
      lang: obj.lang || 'zh_CN',
      success: obj.success || function (res) {
        console.log('getUserInfoSuccess', res)
      },
      fail: obj.fail || function (res) {
        console.log('getUserInfoFail', res)
      }
    })
  },
  // 获取用户缓存信息
  gu (cb) {
    if(wx.getStorageSync('userInfo')) {
      return wx.getStorageSync('userInfo')
    } else {
      let obj = {
        success (res) {
          console.log(res)
          wx.setStorageSync('userInfo', res.userInfo)
          if (cb) {
            cb()
          }
        }
      }
      return this.getUserInfo(obj)
    }
  },
  // 获取消息数量
  getMessageCount (that) {
    let self = this
    let _this = that
    let gmc = {
      url: useUrl.getNotReadMessage,
      data: {
        session_key: self.gs()
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          _this.setData({
            mCount: res.data.data.count
          })
        }
      }
    }
    this.wxrequest(gmc)
  },
  // 输入内容
  inputValue (e, that) {
    let value = e.detail.value
    let type = e.currentTarget.dataset.type
    if (type === 'loginInput') {
      that.setData({
        loginInput: value // 登录输入
      })
    } else if (type === 'pwd') {
      that.setData({
        pwd: value // 密码输入
      })
    } else if (type === 'pwd2') {
      that.setData({
        pwd2: value // 密码输入2
      })
    } else if (type === 'name') {
      that.setData({
        name: value // 姓名
      })
    } else if (type === 'mobile') {
      that.setData({
        mobile: value // 手机号码
      })
    } else if (type === 'code') {
      that.setData({
        code: value // 验证码
      })
    } else if (type === 'translate') {
      that.setData({
        transText: value // 翻译
      })
    } else if (type === 'introduce') {
      that.setData({
        introduceText: value // 介绍输入
      })
    } else if (type === 'money') {
      that.setData({
        outMoney: value
      })
    }
  },
  // 跳转绘本详情
  goHBdetail (e) {
    wx.navigateTo({
      url: `../hbDetail/hbDetail?id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}`
    })
  },
  // 手机号码验证
  checkMobile (mobile) {
    if (!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(mobile))) {
      return true
    }
  },
  // 信息弹窗
  setToast (that, toast, time) {
    let defaultToast = {
      image: '../../images/jiong.png',
      show: true
    }
    Object.assign(defaultToast, toast)
    that.setData({
      toast: defaultToast
    })
    setTimeout(() => {
      defaultToast.show = false
      that.setData({
        toast: defaultToast
      })
    }, (time || 1500))
  },
  // 设置公众号弹窗
  setGzh (that, gzh) {
    let defaultToast = {
      image: '../../images/gzh.png',
      name: '群消息',
      show: true
    }
    Object.assign(defaultToast, gzh)
    wx.setClipboardData({
      data: defaultToast.name
    })
    that.setData({
      gzh: defaultToast
    })
  },
  // 关闭公众号弹窗
  closeGzh (that) {
    that.data.gzh.show = false
    that.setData({
      gzh: that.data.gzh
    })
  },
  // 预览图片
  showImg (e, imgArr) {
    let index = e.currentTarget.dataset.index
    wx.previewImage({
      current: imgArr[index],
      urls: imgArr
    })
  },
  // 跳转方式判断
  gn (url) {
    if (getCurrentPages().length >= 5) {
      wx.redirectTo({
        url
      })
    } else {
      wx.navigateTo({
        url
      })
    }
  },
  // 设置顶部文字
  setBar (text) {
    wx.setNavigationBarTitle({
      title: text
    })
  },
  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch () {
//     console.log(`
//   ┏┛┻━━━┛┻┓
//   ┃｜｜｜｜｜｜｜┃
//   ┃　　　━　　　┃
//   ┃　┳┛　┗┳　┃
//   ┃　　　　　　　┃
//   ┃　　　┻　　　┃
//   ┃　　　　　　　┃
//   ┗━┓　　　┏━┛
//   　　┃　史　┃
//   　　┃　诗　┃
//   　　┃　之　┃
//   　　┃　宠　┃
//   　　┃　　　┗━━━━━━┓
//   　　┃　　　神兽坐镇　　　┣━━┓
//   　　┃　　　永不宕机　　　┃
//   　　┗┓┓┏━┳┓┏━━━┛
//   　　　┃┫┫　┃┫┫
//   　　　┗┻┛　┗┻┛
// `)
    // console.log(' ========== Application is launched ========== ')
    // this.wxlogin()
  },
  /**
   * 生命周期函数--监听小程序显示
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow () {
    // console.log(' ========== Application is showed ========== ')
  },
  /**
   * 生命周期函数--监听小程序隐藏
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide () {
    // console.log(' ========== Application is hid ========== ')
  }
})
