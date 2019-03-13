//index.js
const app = getApp()

Page({
  data: {
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
  
  showpersonal : function (){
	 wx.navigateTo({
		url: '/pages/personal/personal',
	});
  },
  
  showindex: function () {
    wx.navigateTo({
      url: '/pages/index/index',
    });
  },
})
