export default {
  pages: [
    'pages/home/index',
    'pages/scanbill/index',
    'pages/cart/index',   //购物车
    'pages/order/index',   //订单详情
    'pages/person/person', //个人中心
    'pages/test/test', 
    'pages/chart/index',  
    'pages/billdetail/index', //账单详情
    'pages/roominfo/index',  //房台详情
    'pages/tokewine/index', //取酒
    'pages/storewine/index', //存酒
    'pages/paybyvip/index', //会员卡支付
    'pages/applyVip/index', //申请新卡
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '闲娱汇',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    "color": "#7A7E83",
    "selectedColor": "#3cc51f",
    "backgroundColor": "#ffffff",
    "list": [
      {
        "pagePath": "pages/home/index",
        "iconPath": "assets/home_d.png",
        "selectedIconPath": "assets/home_s.png",
        "text": "首页"
      }, {
        "pagePath": "pages/person/person",
        "iconPath": "assets/my_d.png",
        "selectedIconPath": "assets/my_s.png",
        "text": "我的"
      }
    ]
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示'
    }
  }
}
