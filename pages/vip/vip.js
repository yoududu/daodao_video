// pages/vip/vip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipData:[],
    paymoney:0,
    paycount:'',
    vipid:'',
    vipurl:"",
    vipPop:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://81.68.121.52:8000/api/wx/vip',
      success:res => {
        this.setData({
          vipData:res.data.data
        })
        wx.hideLoading()
        console.log(res.data)
      }
    })
  },
  vipbtn(e){
    console.log(e)
    this.setData({
      paymoney:e.currentTarget.dataset.money,
      // paycount:e.currentTarget.dataset.money
      vipid:e.currentTarget.dataset.id,
    })
  },
  paypay(e){
    wx.showLoading({
      title: '加载中',
    })
    console.log(this.data.vipid)
    wx.request({
      url: 'http://81.68.121.52:8000/api/alipay',
      method:'POST',
      data:`pk=${this.data.vipid}`,
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默
        'Authorization':"Bearer"+" "+wx.getStorageSync('ga'),
      },
      success: (res) => {
        console.log(res)
        this.setData({
          vipurl:res.data.url,
          vipPop:true
        })
        wx.hideLoading()
        console.log(this.data.vipurl)
      },
    })
  },
  payok(){
    console.log(111)
    this.setData({
      vipPop:false
    })
  },
  copy(){
    wx.setClipboardData({
      data: this.data.vipurl,
      
      success:function(res) {
        wx.showToast({
          title: '复制成功',
        })
        console.log(res)
      }
      
    })
    console.log(this.data.vipurl+'ararar')
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