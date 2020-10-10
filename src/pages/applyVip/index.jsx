import  React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from '@tarojs/components'
// import classNames  from 'classnames';
// import { uploadFileUrl } from '../../utils/const'
import './index.scss'
@connect(({bill, loading}) => ({
  bill, loading
}))

export default class applyVip extends Component {
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
        申请新卡
      </View>
    )
  }
}

