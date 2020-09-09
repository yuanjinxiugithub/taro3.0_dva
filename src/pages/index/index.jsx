import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Text } from '@tarojs/components'
import { AtButton, AtIcon, AtAvatar } from 'taro-ui'

import './index.scss'
@connect(({home, loading}) => ({
}))
export default class Index extends Component {
  state = {
    menuList : [{
      text:"点单",
      iconSrc: "/assets/caipin-@2x.png",
      directUrl: "/pages/order/index",
      },{
      text:"点花点跳",
      iconSrc: "/assets/huadanmenu@2x.png",
      directUrl: "/pages/order/index",
      },{
      text:"取酒",
      iconSrc: "/assets/qujiu@2x.png",
      directUrl: "/pages/order/index",
      },{
      text:"存酒",
      iconSrc: "/assets/cunjiu@2x.png",
      directUrl: "/pages/order/index",
  }],
  }

  componentWillMount () { 
    const { dispatch } = this.props;
    // 测试 调用 models
    dispatch({type: 'home/load'});
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  omClickMenu (item) {
    console.log(item)
    Taro.navigateTo({url:item.directUrl})

  }

  render () {
    const { menuList } = this.state;
    return (
      <View className='page'>
        <View className='header'>
          <View className='header_left'>
             <AtAvatar className='header_left_img' circle image="http://thirdwx.qlogo.cn/mmopen/ajNVdqHZLLCudqg5zBCIGMj1PTsSkbjLOHllGDY1k2EBT9ZSpBJJtF7FRdBib8vB6b1g831zwcVOSfPsibrLCEkg/132" />
             <View className='header_left_text'>
                <View className="header_left_text_cs">搜娱研发</View>
                <View>欢迎光临，李四</View>
             </View>
          </View>
          <View className='header_right'>
             <View className='header_right_room'>A04</View>
             <View className='header_right_state'>消费中</View>
          </View>
        </View>
        <View className='content'>
          <View className='server_menu'>
            <View className='menu_title'>请选择您需要的服务</View>
            {menuList.map((item,index) => (
             <View key={index} className='menu_item' onClick={() => this.omClickMenu(item)}>{item.text}</View>
             )) }
          </View>
        </View>
      </View>
    )
  }
}
