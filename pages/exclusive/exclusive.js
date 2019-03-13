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
	uid:'',
    hide: true,
  },
  
  
  onLoad: function (options) {
    var that = this
    //网络请求 GET方法
    wx.getStorage({
		key: 'third_Session',
		success(res) {
			console.log(res.data);   //用户session是否存在
			wx.request({
			  url: requestUrl, //仅为示例，并非真实的接口地址
			  data: {
				act: 'share',
				session:res.data,
			  },
			  success(res) {
				console.log(res);
				if(res.data.error=='fail'){
					console.log(res.data.msg);
				}else{
					console.log(res.data);
					var base64 = wx.arrayBufferToBase64(res.data);
					that.setData({
					  uid:res.data.uid,
					  classname:res.data.classname,
					  description:res.data.description,
					  avatar:res.data.avatar,
					})
				}
			  }
			})
		}
	})
  },
  
  
  onShareAppMessage: function() {
    let users = wx.getStorageSync('user');
    if (res.from === 'button') {
		
	}
    return {
      title: '转发',
      path: '/pages/index/index?from_uid=' + users.id,
      success: function(res) {
		  
	  }
    }

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
})
