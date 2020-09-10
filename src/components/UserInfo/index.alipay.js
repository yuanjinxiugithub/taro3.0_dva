import React , { Component } from 'react'
import { View, Input } from '@tarojs/components'
import './index.scss'

export default class index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: props.value,
    };
  }

  onGetAuthorize = () => {
    const { getInfo } = this.props
    my.getOpenUserInfo({
      success: res => {
        const userInfo = JSON.parse(res.response).response
        if(userInfo.code == "10000"){
          getInfo({nickName: userInfo.nickName, 
            avatar: userInfo.avatar ,
            gender: userInfo.gender,
            province: userInfo.province,
            city: userInfo.city,
            country: userInfo.countryCode})
        }else{
          my.alert({
            title: 'sorry',
            content: userInfo.msg,
            buttonText: '我知道了'
          })
        }

      },
      fail: res => {},
      complete: res => {}
    });
  }

  render () {
    return (<View className="userinfo">
      <button 
      open-type="getAuthorize" 
      onGetAuthorize={this.onGetAuthorize} 
      onError="onAuthError" 
      scope='userInfo'>
          会员基础信息授权
      </button>
    </View>)
  }
}
