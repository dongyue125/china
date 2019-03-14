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
	const pid = decodeURIComponent(options.scene)
	app.globalData.pid = pid
	
    //网络请求 GET方法
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      data: {
        act: 'home'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res);
        that.setData({
          logo:res.data.logo,
		  info:res.data.info,
		  vpic:res.data.vpic,
		  vurl:res.data.vurl,
		  dpic:res.data.dpic,
		  lname:res.data.lname,
		  lpic:res.data.lpic,
		  cname:res.data.cname,
		  cpic:res.data.cpic,
		  npic:res.data.npic,
		  tpic:res.data.tpic,
		  zpic:res.data.zpic,
		  tel:res.data.tel,
		  hezuo:res.data.hezuo,
		  email:res.data.email,
		  address:res.data.address,
		  sign:res.data.sign,
		  small:res.data.small,
		  copyright:res.data.copyright,
		  icp:res.data.icp,
        })
      }
    })
  },
  
  bindGetUserInfo: function(e) {
	if (e.detail.userInfo) {
		//用户按了允许授权按钮
		console.log(e.detail.userInfo);
		wx.navigateTo({
			url: '/pages/personal/personal',
		});
	} else {
		//用户按了拒绝按钮
		console.log('用户拒绝了授权！');
	}
  },
 
  
  click: function () {
    this.setData({
      hide: !this.data.hide
    })
  },
  
  showcart: function () {
	wx.navigateTo({
		url: '/pages/cart/cart',
	})
  },
  
  
  showindex: function () {
    wx.navigateTo({
      url: '/pages/index/index',
    });
  },
  showdaren: function () {
    wx.navigateTo({
      url: '/pages/daren/daren',
    });
  },
  showddk: function () {
    wx.navigateTo({
      url: '/pages/ddk/ddk',
    });
  },
  showsddk: function () {
    wx.navigateTo({
      url: '/pages/showddk/showddk',
    });
  },
  showproduct: function (e) {
	  var cid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/product/product?cid='+cid,
    });
  },
  showlife: function () {
    wx.navigateTo({
      url: '/pages/life/life',
    });
  },
  showcustom: function () {
    wx.navigateTo({
      url: '/pages/custom/custom',
    });
  },
  showcooperation: function () {
    wx.navigateTo({
      url: '/pages/cooperation/cooperation',
    });
  },
  showrecruiting: function () {
    wx.navigateTo({
      url: '/pages/recruiting/recruiting',
    });
  },
  showsubscribe: function () {
    wx.navigateTo({
      url: '/pages/subscribe/subscribe',
    });
  },
  showspellgroup: function () {
    wx.navigateTo({
      url: '/pages/spellgroup/spellgroup',
    });
  },
  showgroupshare: function () {
    wx.navigateTo({
      url: '/pages/groupshare/groupshare',
    });
  },
  showspellgrouporder: function () {
    wx.navigateTo({
      url: '/pages/spellgrouporder/spellgrouporder',
    });
  },
  showrecommended: function (e) {
	   var cid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/recommended/recommended?cid='+cid,
    });
  },
  showhistory: function () {
    wx.navigateTo({
      url: '/pages/history/history',
    });
  },
  showselection: function () {
    wx.navigateTo({
      url: '/pages/selection/selection',
    });
  },
  showstores: function () {
    wx.navigateTo({
      url: '/pages/stores/stores',
    });
  },
  showwash: function () {
    wx.navigateTo({
      url: '/pages/wash/wash',
    });
  },
  showbuy: function () {
    wx.navigateTo({
      url: '/pages/buy/buy',
    });
  },
  showsubmit: function () {
    wx.navigateTo({
      url: '/pages/submit/submit',
    });
  },
  showpay: function () {
    wx.navigateTo({
      url: '/pages/pay/pay',
    });
  },
  showvieworder: function (e) {
	var checkinfo = e.currentTarget.dataset.current;
    wx.navigateTo({
      url: '/pages/vieworder/vieworder?checkinfo='+checkinfo,
    });
  },
  showshopping: function () {
    wx.navigateTo({
      url: '/pages/shopping/shopping',
    });
  },
  showpersonal: function () {
    wx.navigateTo({
      url: '/pages/personal/personal',
    });
  },
  showtopup: function () {
    wx.navigateTo({
      url: '/pages/topup/topup',
    });
  },
  showcomplete: function () {
    wx.navigateTo({
      url: '/pages/complete/complete',
    });
  },
  showdistribution: function () {
    wx.navigateTo({
      url: '/pages/distribution/distribution',
    });
  },
  showexclusive: function () {
    wx.navigateTo({
      url: '/pages/exclusive/exclusive',
    });
  },
  showaddress: function () {
    var that = this;
	wx.chooseAddress({
		success(res) {
			console.log(res);
			const prov = res.provinceName;
			const city = res.cityName;
			const country = res.countyName;
			const address = res.detailInfo;
			const consignee = res.userName;
			const tel = res.telNumber;
			//网络请求 GET方法
			wx.getStorage({
				key: 'third_Session',
				success(res) {
					console.log(res.data);   //用户session是否存在
					wx.request({
					  url: requestUrl, //仅为示例，并非真实的接口地址
					  method: "POST",
					  data: {
						act: 'add_address',
						prov: prov,
						city:city,
						country:country,
						address:address,
						tel:tel,
						consignee:consignee,
						session:res.data,
					  },
					  header: {
						"Content-Type": "application/x-www-form-urlencoded"
					  },
					  success(res) {
						that.setData({
							consignee: res.data.consignee,
							tel: res.data.tel,
							prov: res.data.prov,
							city: res.data.city,
							country: res.data.country,
							address: res.data.address,
						})
					  }
					})
				}
			})
		}
	})
  },
  showaddaddress: function () {
    wx.navigateTo({
      url: '/pages/addaddress/addaddress',
    });
  },
  shownews: function (e) {
	  var cid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/news?cid='+cid,
    });
  },
});