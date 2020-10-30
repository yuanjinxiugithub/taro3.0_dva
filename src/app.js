/* eslint-disable no-unused-vars */
//import '@tarojs/async-await'
import React, { Component } from 'react'
import { Provider } from 'react-redux'


import { baseURL } from './utils/const'
import { getAuthCode } from './utils/utils'
import dva from './dva'
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

window.g_store = store;

class App extends Component {

  componentDidMount () {
    const env =  process.env.TARO_ENV; //获取内置环境变量
    // Taro.getSystemInfo().then(res => console.log(res)) 获取系统信息
    getAuthCode((code)=>{
      dvaApp.dispatch({type: 'home/login', payload: { Code: "aabbccdd", Flag: 0}})
    }); 
    //获取用户的authcode 并调用后台login登陆接口获取openID
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
