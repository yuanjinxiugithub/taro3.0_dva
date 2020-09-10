import React , { Component } from 'react'
import { View } from '@tarojs/components'
import './index.scss'

export default class index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: props.value,
    };
  }
  render () {
    return (<View className="userinfo">
      h5
    </View>)
  }
}
