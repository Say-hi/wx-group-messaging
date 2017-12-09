// 获取全局应用程序实例对象
const app = getApp()
const useUrl = require('../../utils/service')
const common = require('../../utils/common')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    typeArr: [
      'icon-wenzi',
      'icon-tupian',
      'icon-icon1',
      'icon-link'
    ],
    typeChoose: 0,
    isComment: true,
    imgArr: []
  },
  // 获取输入内容
  getInput (e) {
    this.setData({
      content: e.detail.value
    })
  },
  // 发布内容
  confirm () {
    let that = this
    for (let v of this.data.permission) {
      if (parseInt(v) === this.data.typeChoose * 1) {
        return app.setToast(that, {content: '抱歉，本群限制该类型内容的发布'})
      }
    }
    let {group_id, content, address, typeChoose, isComment, imgArr, audio_url, article_url} = this.data
    if (!content || !content.trim()) {
      return app.setToast(this, {content: '请输入这一刻的想法'})
    } else if (imgArr.length > 9) {
      return app.setToast(this, {content: '最大图片为9张，请删除多余的图片'})
    }
    app.wxrequest({
      url: useUrl.postReleaseGroupFriendCircle,
      data: {
        session_key: app.gs(),
        group_id,
        content,
        address: address || '',
        type: typeChoose,
        is_comment: isComment ? 1 : 0,
        images: JSON.stringify(imgArr),
        audio_url,
        article_url
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          wx.showToast({
            title: '发布成功',
            mask: true
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 700)
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 添加图片
  addImage () {
    let that = this
    app.wxUploadImg(url => {
      that.data.imgArr.unshift(url)
      that.setData({
        imgArr: that.data.imgArr
      })
    }, 9)
  },
  // 删除图片
  delPhoto (e) {
    common.delphoto(this, e, 'imgArr', (that, imgArr) => {
      that.setData({
        imgArr
      })
    })
  },
  // 预览图片
  previewImg (e) {
    common.showImg(this, e, 'imgArr')
  },
  // switch切换
  switchChange (e) {
    this.setData({
      isComment: e.detail.value
    })
  },
  // 发布类型选择
  tC (e) {
    let that = this
    for (let v of this.data.permission) {
      if (parseInt(v) === e.currentTarget.dataset.index * 1 + 1) {
        return app.setToast(that, {content: '抱歉，本群限制该类型内容的发布'})
      }
    }
    if (this.data.typeChoose * 1 === e.currentTarget.dataset.index * 1) return
    this.setData({
      typeChoose: e.currentTarget.dataset.index,
      imgArr: [],
      content: '',
      audio_url_c: '',
      audio_url: '',
      article_url: '',
      article: ''
    })
  },
  // 开始录音
  startRecord () {
    let that = this
    that.setData({
      record: true
    })
    wx.startRecord({
      success (res) {
        that.setData({
          audio_url_c: res.tempFilePath
        })
        wx.showLoading({
          title: '上传语音中'
        })
        wx.uploadFile({
          url: useUrl.uploadPhotos,
          filePath: res.tempFilePath,
          name: 'file',
          formData: {
            session_key: app.gs(),
            file: 'file',
            type: 'audio'
          },
          success (res) {
            // console.log(res)
            // let imgUrl = JSON.parse(res.data).data.res_file
            wx.hideLoading()
            that.setData({
              record: false,
              audio_url: JSON.parse(res.data).data.res_file
            })
          }
        })
      }
    })
  },
  // 停止录音
  stopRecord () {
    wx.stopRecord()
  },
  // 播放语音文件
  playVoice () {
    let that = this
    wx.playVoice({
      filePath: that.data.audio_url_c
    })
  },
  // 获取群友圈权限
  getPermission (id) {
    let that = this
    app.wxrequest({
      url: useUrl.releaseGroupFriendCircle,
      data: {
        session_key: app.gs(),
        group_id: id
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            permission: res.data.data.limit_arr,
            group_id: id
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取用户的地理位置
  chooseLocation (type) {
    app.getLocation(this, type)
  },
  // 获取公众号文章
  getWXarticle (e) {
    let that = this
    app.wxrequest({
      url: useUrl.getWeixinArticleInfo,
      data: {
        session_key: app.gs(),
        article_url: e.detail.value
      },
      success (res) {
        wx.hideLoading()
        if (res.data.code === 200) {
          that.setData({
            article_url: e.detail.value,
            article: res.data.data
          })
        } else {
          app.setToast(that, {content: res.data.message})
        }
      }
    })
  },
  // 获取公众号文章链接
  getArticle (e) {
    if (e.detail.value.trim().indexOf('http://mp.weixin.qq.com') === 0) {
      this.getWXarticle(e)
    } else {
      app.setToast(this, {content: '请输入正确的公众号文章链接'})
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.getPermission(options.id)
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
