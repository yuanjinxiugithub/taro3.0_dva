import  React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from '@tarojs/components'
// import classNames  from 'classnames';
// import { uploadFileUrl } from '../../utils/const'
import './index.scss'

 class Index extends Component {
  constructor(){
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
       房台详情
      </View>
    )
  }
}

export default connect(({ loading }) => ({
  loading
}))(Index);