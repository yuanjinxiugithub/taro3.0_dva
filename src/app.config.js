/*
 * @Author: yjx
 * @Date: 2020-09-08 17:21:33
 * @LastEditTime: 2020-09-16 09:59:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /taro-ui-k/src/app.config.js
 */
export default {
  pages: [
    'pages/index/index',
    'pages/cart/index',
    'pages/order/index',
    'pages/person/person',
    'pages/test/test',
    'pages/chart/index',
    'pages/viewscroll/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '闲娱汇',
    navigationBarTextStyle: 'black'
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示'
    }
  }
}
