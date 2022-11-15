// pages/personal/personal.js
Page({
  data: {
    userInfo: {
      nickName: '',
      avatarUrl: "",
      gaa:""
    },
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    vipicon:true,
  },
  onLoad(options) {
    if (wx.getUserProfile) {
      if(!token){
        var token = wx.getStorageSync('ga')
        this.setData({
          'userInfo.avatarUrl':wx.getStorageSync('avator'),
          'userInfo.nickName':wx.getStorageSync('nickname')
        })
        this.setData({
          hasUserInfo:true,
        })
      }else{
        this.setData({
          hasUserInfo:false,
        })
      }
      // console.log(wx.getStorageSync('ga'))
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
  },
  getUserProfile(e) {
    wx.showLoading({
      title: '加载中',
    })
    // 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          // nickName:userInfo.nickName,
          // avatarUrl:userInfo.avatarUrl,
          hasUserInfo: true
        })
        wx.hideLoading()
        wx.login({
          success: ress => {
            let codee = ress.code;
            // console.log(ress.code)
            wx.request({
              url: 'http://81.68.121.52:8000/api/wx/login',
              method: 'POST',
              data: `nickname=${this.data.userInfo.nickName}&jscode=${codee}&gender=0&avatar=${this.data.userInfo.avatarUrl}`,
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默
              },
              success: (result) => {
                console.log(result)
                wx.setStorageSync('nickname', this.data.userInfo.nickName)
                wx.setStorageSync('avator', this.data.userInfo.avatarUrl)
                let ga = result.data.token;
                this.setData({
                  gaa : wx.setStorageSync('ga',ga)
                })
                // console.log('ga'+this.data.gaa,result.data.token);         
                // console.log(this.data.userInfo.nickName,codee,this.data.userInfo.avatarUrl)
              },
              fail: (error) => {
                console.log('失败' + error)
              }
            })
          }
        })
      },
      fail: (error) => {
        console.log('失败' + error)
      }
    })
  },
  letoff(){
    console.log(123333)
    wx.clearStorageSync()
    this.setData({
      hasUserInfo:false
    })
  },
  openvip() {
    wx.navigateTo({
      url: `/pages/vip/vip`,
    })
    // console.log(this.userInfo.nickName)
  },
  getUserInfo(e) {
    // 不推荐使用 getUserInfo 获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log('2' + userInfo)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  // getUserProfile(e) {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       wx.login({
  //         success: ress => {
  //             let codee = ress.code;
  //             wx.request({
  //                 url: 'http://81.68.121.52:8000/api/wx/login',
  //                 method:'POST',
  //                 data: {
  //                   nickname:'昵称',
  //                   jscode: codee,
  //                   gender: '0',
  //                   avatar:{
  //                     url:`/public/icon/personalb.png`
  //                   }
  //                 },
  //                 header: {
  //                   'content-type': 'application/x-www-form-urlencoded' // 默认值
  //                 },
  //                 success :(result) => {
  //                   console.log(result)
  //                   console.log(222222)
  //                   console.log(result.data.openId)
  //                   wx.request({
  //                     url: 'http://81.68.121.52:8000/api/wx/login',
  //                   })
  //                   // console.log(res.data)
  //                 },fail:(error) => {
  //                   console.log('error'+error)
  //                 }
  //               })
  //             }
  //       // this.setData({
  //       //   userInfo: res.userInfo,
  //       //   hasUserInfo: true
  //       })
  //     }
  //   })
  // },
  // login(){
  //   console.log(11111);
  //   wx.login({
  //     success: res => {
  //       // if(res.code){
  //         let codee = res.code;
  //       //   let appid = "wxe810f216f8a1a5ce";
  //       //   let secret ="11111"
  //       wx.request({
  //         url: 'http://81.68.121.52:8000/api/wx/login',
  //         method:'POST',
  //         data: {
  //           nickname:'昵称',
  //           jscode: codee,
  //           gender: '0',
  //           avatar:{
  //             url:`/public/icon/personalb.png`
  //           }
  //         },
  //         header: {
  //           'content-type': 'application/x-www-form-urlencoded' // 默认值
  //         },
  //         success :(result) => {
  //           console.log(result)
  //           console.log(222222)
  //           console.log(result.data.openID)
  //         },fail:(error) => {
  //           console.log('error'+error)
  //         }
  //       })
  //     }
  //   })
  // },
})