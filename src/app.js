//import '@tarojs/async-await'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Taro from '@tarojs/taro'
import dva from './dva'
import { getAuthCode } from './utils/utils'
import models from './models'

import './custom-theme.scss'
import './app.scss'

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  onError(e, dispatch) {
  },
})
const store = dvaApp.getStore();

class App extends Component {

  componentDidMount () {
    const env =  process.env.TARO_ENV; //获取内置环境变量
    getAuthCode(); //获取用户的authcode 并调用后台login登陆接口获取userID
    if(env == 'weapp'){
      //检查登陆是否失效
      Taro.checkSession({
        success: function (res) {
          //session_key 未过期，并且在本生命周期一直有效
        },
        fail: function () {
          // session_key 已经失效，需要重新执行登录流程
          Taro.login() //重新登录
        }
      })
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return (
     <Provider store={store}> 
     {this.props.children}
    </Provider>
    )
     
  }
}
export default App
