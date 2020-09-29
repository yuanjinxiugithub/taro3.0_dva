export default {
  pages: [
    'pages/home/index',
    'pages/scanbill/index',
    'pages/cart/index',
    'pages/order/index',
    'pages/person/person',
    'pages/test/test',
    'pages/chart/index'
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
