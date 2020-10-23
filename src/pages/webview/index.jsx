import  React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Text , WebView } from '@tarojs/components'
import './index.scss'

@connect(({bill, loading}) => ({
  bill, loading
}))
export default class Index extends Component {
  constructor(props){
    super(...arguments);
    this.state = {
     
    };
  }
 
  componentWillMount () { 
   
  }

  componentDidMount () {
  
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidUpdate(){ }

  componentDidHide () { }

  handleMessage(e){
   console.log(e)
  }

  onLoad (e){
   console.log(e)
  }

  onError(e){
    console.log(e);
  }

  render () {
    return (
        <WebView 
        src='https://mp.weixin.qq.com/s/0iBGkCPXNr9PKkejLEfKgQ' 
        onMessage={this.handleMessage} 
        onLoad={this.onLoad} 
        onError={this.onError}/>
    )
  }
}
