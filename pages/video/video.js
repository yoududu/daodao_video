// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoData:[],
    chapteridd:1,
    chapternamee:"绪论",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options)
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      chapteridd:options.chapterid,
      chapternamee:options.chaptername,
    })
    let chapterid=options.chapterid;
    wx.request({
      url:'http://81.68.121.52:8000/api/wx/video',
      data:{
        pk:chapterid
      },
      success: res =>{
        this.setData({
          videoData:res.data.data
        })
        wx.hideLoading()
        // console.log(res.data)
      }
    })
  },
  videourl(e){
    // console.log(e)
    let mp4url = e.currentTarget.dataset.index;
    let newmp4url = mp4url.slice(0,mp4url.indexOf('.'));
    let mp4name = e.currentTarget.dataset.name
    // console.log(newmp4url)
    wx.navigateTo({
      url: `/pages/videoplay/videoplay?newmp4url=${newmp4url}&mp4name=${mp4name}`,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})