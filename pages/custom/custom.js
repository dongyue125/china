//index.js
const app = getApp()

Page({
  data: {
    multiIndex: [0, 0, 0],
    date: '2019-02-01',
    time: '12:01',

    multiIndex: [0, 0, 0],
    region: ['辽宁省', '沈阳市', '和平区'],
    customItem: '全部',

    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    hide: true,
  },
  click: function () {
    this.setData({
      hide: !this.data.hide
    })
  },
  showindex: function () {
    wx.navigateTo({
      url: '/pages/index/index',
    });
  },

  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
 
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

})
