import React , { Component } from 'react'
import { View , Text} from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import './index.scss'

export default class index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: props.value,
    };
  }

  getUserInfo = () => {
    const { getInfo } = this.props
    Taro.getUserInfo({
      success: res => {
        const userInfo = res.userInfo;
        if(getInfo){
          getInfo({nickName: userInfo.nickName, 
                   avatar: userInfo.avatarUrl ,
                   gender: userInfo.gender,
                   province: userInfo.province,
                   city: userInfo.city,
                   country: userInfo.country
                  })
        }
      },
      fail: res => {

      },
      complete: res => {}
    })
  }

  render () {
    return (
    <View className="userinfo">
      <AtButton onClick={this.getUserInfo}  open-type="getAuthorize">获取用户信息</AtButton>
    </View>)
  }
}
