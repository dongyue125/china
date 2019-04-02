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
	
	oid:'',
	
    // input默认是1  
    num: 1,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled'
  },
  
  
  
  
  onLoad: function (options){
    var that = this
    //网络请求 GET方法
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      data: {
        act: 'recharge'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res),
        that.setData({
		  classname:res.data.classname,
		  content:res.data.content,
        })
      }
    })
  },
  
  
  
  formSubmit(e) {
	var that = this
	if(e.detail.value.money==''){
	  wx.showModal({
		title: '提示',
		showCancel: false,
		content: '请输入充值金额！',
	  });
	  return false;
	}
	else if(e.detail.value.money < 0.01){
		wx.showModal({
		title: '提示',
		showCancel: false,
		content: '充值金额不能小于0.01！',
	  });
	  return false;
	}
	else if(e.detail.value.money > 50000){
		wx.showModal({
		title: '提示',
		showCancel: false,
		content: '充值金额不能大于50000！',
	  });
	  return false;
	}
	else{
		wx.getStorage({
			key: 'third_Session',
			success(res) {
				wx.request({
				  url: requestUrl, //仅为示例，并非真实的接口地址
				  method: "POST",
				  data: {
					act: 'do_recharge',
					session:res.data,
					money : e.detail.value.money,
				  },
				  header: {
					"Content-Type": "application/x-www-form-urlencoded"
				  },
				  success(res) {
					if(res.data.error == 'fail'){
						wx.showModal({
							title: '提示',
							showCancel: false,
							content: res.data.msg,
						});
						return false;
					}else{
						that.setData({
						  oid:res.data.oid,
						})
						wx.request({
						  url: requestUrl, //仅为示例，并非真实的接口地址
						  method: "POST",
						  data: {
							act: 'pay_recharge',
							oid:res.data.oid,
						  },
						  header: {
							"Content-Type": "application/x-www-form-urlencoded"
						  },
						  success(res) {
							if(res.data.error == 'fail'){
								wx.showModal({
									title: '提示',
									showCancel: false,
									content: res.data.msg,
								});
								return false;
							}else{
								wx.requestPayment({
									'timeStamp': res.data.timeStamp,
									'nonceStr': res.data.nonceStr,
									'package': res.data.package,
									'signType': res.data.signType,
									'paySign': res.data.paySign,
									'success':function(res){
										wx.request({
										  url: requestUrl, //仅为示例，并非真实的接口地址
										  data: {
											act: 'update_recharge',
											oid: that.data.oid,
										  },
										  header: {
											'content-type': 'application/json' // 默认值
										  },
										  success(res) {
											wx.navigateTo({
												url: '/pages/complete/complete',
											});
										  }
										})
									},
									'fail':function(res){
										console.log('充值失败！');
									},
									'complete':function(res){
										console.log(res);
									}
								})
							}
						  }
						})
						
					}
				  }
				})
			}
		})
	}
  },
  
  
  
  
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
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
  
  shownews: function (e) {
	  var cid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/news?cid='+cid,
    });
  },
  
  
  
  
  
})
