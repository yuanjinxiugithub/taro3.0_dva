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
       <PayWay
         wayList ={payway}
         checkedValue="wx"
       >
       </PayWay>
      </View>
    )
  }
}
