import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View , Text } from '@tarojs/components'
import { AtButton, AtIcon, AtAvatar } from 'taro-ui'
import UserInfo from '../../components/UserInfo/index'
import { getUserInfo } from '../../utils/utils'
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

  render () {
    const { userInfo } = this.state
    return (
      <View className='page'>
        <View className="tips"><Text>点击按钮可获取用户头像、昵称、所在城市等基础信息</Text></View>
        <AtAvatar className="avatar" circle size="small" image={userInfo.avatar} />
        <View className="nick_name">{userInfo.nickName}</View>
        <View className="nick_name">{userInfo.provice}{userInfo.city}</View>
        <UserInfo 
         getInfo = {(val) => this.getUserInfo(val)}
        />
      </View>
    )
  }
}
