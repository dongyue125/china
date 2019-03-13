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
	wx.getStorage({
		key: 'third_Session',
		success(res) {
			wx.request({
			  url: requestUrl, //仅为示例，并非真实的接口地址
			  data: {
				act: 'order_info',
				oid: oid,
				session:res.data,
			  },
			  success(res) {
				console.log(res.data);
				that.setData({
					oid:res.data.oid,
					title:res.data.title,
					amount:res.data.amount,
					money:res.data.money,
				})
			  }
			})
		}
	})
  },
  
  
  
  
  
  click: function () {
    this.setData({
      hide: !this.data.hide
    })
  },
  
  showorder : function (e){
	  var checkinfo = e.currentTarget.dataset.current;
	wx.navigateTo({
      url: '/pages/vieworder/vieworder?checkinfo='+checkinfo,
	});
  },
  
  showindex: function () {
    wx.navigateTo({
      url: '/pages/index/index',
    });
  },
})
