import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from '@tarojs/components'
import { AtButton, AtIcon, AtAvatar } from 'taro-ui'

import './index.scss'
@connect(({home, loading}) => ({
}))
export default class Index extends Component {
  state = {
 
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='page'>
          购物车页面
      </View>
    )
  }
}
