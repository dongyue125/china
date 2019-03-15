//index.js
const app = getApp()
const requestUrl = require('../../config').requestUrl
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    hide: true,
  },
  
  
  onLoad: function (options) {
    var that = this
	var oid  = options.oid
	
    //网络请求 GET方法
	wx.request({
	  url: requestUrl, //仅为示例，并非真实的接口地址
	  data: {
		act: 'recharge_show',
		oid: oid,
	  },
	  success(res) {
		console.log(res.data);
	  }
	})
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
