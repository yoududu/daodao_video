// index.js
// 获取应用实例
const app = getApp()
const order = ['demo1', 'demo2', 'demo3', 'demo4', 'demo5', 'demo6', 'demo7']

Page({
  onShareAppMessage() {
    return {
      title: 'scroll-view',
      path: 'page/component/pages/scroll-view/scroll-view'
    }
  },
  data: {
    titleData: [],
    chapterData:[],
    videoData:[],
    toView: 'green',
    active:1,
    name:33,
    titleid:33
  },
  title() {
    wx.request({
      url: 'http://81.68.121.52:8000/api/wx/navigation', 
      success: res => {
        this.setData({
          titleData: res.data.data,
        })
      }
    })
  },
  titletaps(event){
    // console.log(event)
    // console.log(event.detail.name)
    this.setData({
      titleid :event.detail.name
    })
    this.chapterdata();
  },
  chapterdata(){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://81.68.121.52:8000/api/wx/chapter',
      data: {
        pk:this.data.titleid,
      },
      success: res => {
        this.setData({
          chapterData: res.data.data,
        })
        wx.hideLoading()
        // this.data[titleid].style.color = red;
      }
    })
  },
  chapterid(e){
    let chapterid = e.currentTarget.dataset.id;
    let chaptername = e.currentTarget.dataset.name;
    // console.log(e)
    wx.navigateTo({
      url: `/pages/video/video?chapterid=${chapterid}&chaptername=${chaptername}`,
    })
    // wx.switchTab({
    //   url: '/pages/video/video.wxml',
    // })
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    this.title(),
    this.chapterdata(),
    // this.name = 33,
    wx.showLoading({
        title:'加载中',
        // icon:'loading',
        // duration:3000,
        // mask:true
    })
    setTimeout(function(){
      wx.hideLoading()
    },2000)
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})