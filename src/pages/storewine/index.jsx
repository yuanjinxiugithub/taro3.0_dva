import  React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Text , ScrollView } from '@tarojs/components'
import classNames  from 'classnames';
import { uploadFileUrl } from '../../utils/const'
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

  render () {
    return (
      <View className='page'>
       存酒
      </View>
    )
  }
}
