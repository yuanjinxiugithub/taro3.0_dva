import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View , Text } from '@tarojs/components'
import { AtButton, AtAvatar } from 'taro-ui'
import Taro from '@tarojs/taro'
import UserInfo from '../../components/UserInfo/index'
import './person.scss'
@connect(({ loading}) => ({
}))
export default class Index extends Component {
  constructor(props){
    super(props);
  }
  state = {
    userInfo: {}
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getUserInfo(info) {
    console.log(info)
    this.setState({ userInfo: info })
  }

  scanCode = () =>{
    Taro.scanCode({
      success: (res) => {
        console.log(res)
      }
    });
  }

  render () {
    const { userInfo } = this.state
    return (
      <View className='page'>
        <View className="tips"><Text>点击按钮可获取用户头像、昵称、所在城市等基础信息</Text></View>
        <AtAvatar className="avatar" circle size="small" image={userInfo.avatar} />
        <View className="nick_name">{userInfo.nickName}</View>
        <View className="nick_name">{userInfo.province}{userInfo.city}</View>
        <UserInfo 
         getInfo = {(val) => this.getUserInfo(val)}
        />
        <View style="height: 20px"/>
        <AtButton onClick={this.scanCode}>调用扫码</AtButton>
      </View>
    )
  }
}
