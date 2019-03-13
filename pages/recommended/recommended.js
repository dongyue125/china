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
    flag: true,
  },
  
  onLoad: function (options) {
    var that = this
	var cid = options.cid
    //网络请求 GET方法
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      data: {
        act: 'recommend',
		classid : cid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res),
        that.setData({
         classname:res.data.classname,
		 description:res.data.description,
		 list:res.data.recommend,
		 clist:res.data.clist,
		 cid:res.data.cid,
        })
      }
    })
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
  showrecommended : function (e){
	var cid = e.currentTarget.dataset.id;
	wx.navigateTo({
      url: '/pages/recommended/recommended?cid='+cid,
    });
  },
  showzx: function () {
    this.setData({
      flag: false
    })
  },
  hidezx: function () {
    this.setData({
      flag: true
    })
  }
})
