import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Text } from '@tarojs/components'
import Stepper from '../../components/Stepper/index'
import { AtButton } from 'taro-ui'
import './index.scss'

@connect(({bill, loading}) => ({
  bill , loading
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
      <View className='cart_page'>
        账单详情
      </View>
    )
  }
}
