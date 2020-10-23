import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View } from '@tarojs/components'
import PayWay from '../../components/PayWay/index'
import { AtButton, AtAvatar } from 'taro-ui'

import './index.scss'
@connect(({home, loading}) => ({
  home, loading
}))
export default class Index extends Component {
  state = {
  }

  componentWillMount () { 
  }

  componentDidMount () {
  }
  
  componentWillReceiveProps(newProps){ }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onScan(flag) {
    let url = ""
    switch(flag){
      case 1:
        url = '/pages/scanbill/index'
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        url = '/pages/webview/index'
          break;
      case 5: 
        url = "/pages/native/native"
        break;
      case 6: 
        url = "/pages/echarts/index"
        break;
      case 7: 
        url = "/pages/map/index"
        break;
      default:
        break  
    }
    if(url != "")
    Taro.navigateTo({url});
  }

  onChange = (item) => {
    console.log(item)
  }

  render () {
    const payway = [{id:'wx',title:'微信'},{id:'vip',title:'会员卡'}]
    return (
      <View className='page'>
       <AtButton className="btn" onClick={()=>{this.onScan(1)}}>扫码结账</AtButton>
       <AtButton className="btn" onClick={()=>{this.onScan(2)}}>扫码存酒</AtButton>
       <AtButton className="btn" onClick={()=>{this.onScan(3)}}>扫码取酒</AtButton>
       <AtButton className="btn" onClick={()=>{this.onScan(4)}}>WebView</AtButton>
       {
         process.env.TARO_ENV === 'weapp'  &&
         <AtButton className="btn" onClick={()=>{this.onScan(5)}}>微信小程序原生</AtButton>
       }
        <AtButton className="btn" onClick={()=>{this.onScan(6)}}>Echarts</AtButton>
        <AtButton className="btn" onClick={()=>{this.onScan(7)}}>地图</AtButton>
      </View>
    )
  }
}
