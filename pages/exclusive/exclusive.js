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
  
  
  onShareAppMessage: function(res) {
	var that = this;
	let uid = that.data.uid;
	let url = 'https://dadakan.com.cn/SmallApi.php?act=qrcode&uid='+uid;
    if (res.from === 'button') {
		console.log('用户点击了页面分享按钮');
	}else{
		console.log('用户点击了右上角分享按钮');
	}
    return {
		title: '我的名片',
		path: '/pages/index/index?pid='+uid,
		imageUrl: url,
		success: function (res) {
			console.log('成功', res)
		},
		fail: function (res){
			console.log("分享失败",res)
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
