import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View , Text } from '@tarojs/components'
import { AtButton, AtAvatar } from 'taro-ui'
import Taro from '@tarojs/taro'
import './test.scss'
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

  onClickBtn = (val) => {
    Taro.pageScrollTo({
      selector: `#${val}`,
      duration: 300
    })
  }

  render () {
    return (
      <View className='page'>
        <View className="btns">
          {['A','B',"C",'D',"E"].map((o) => (
            <View className="btn" onClick={()=>{this.onClickBtn(o)}}> {o}</View>
          ))}
        </View>
        <View className="list">
          {['A','B','C','D','E'].map(o => (
            <View id={o} className='list_item'>{o}</View>
          )) }
        </View>
      </View>
    )
  }
}
