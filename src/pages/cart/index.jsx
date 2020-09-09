import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Text } from '@tarojs/components'
import Stepper from '../../components/Stepper/index'
import { AtButton } from 'taro-ui'
import './index.scss'

@connect(({home, loading}) => ({
  home , loading
}))
export default class Index extends Component {
  state = {
 
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  goback(){
    Taro.navigateBack()
  }

  onChangeStepper(val,item){
    const { dispatch } = this.props
    dispatch({
      type: 'home/changeHotFoodCount',
      payload: { val , id: item.FD_ID }
    })
  }

  render () {
    const { home: { hotFood } } = this.props
    let sumMoney = 0 ;
    hotFood.filter(o => o.count >0).map(o =>{
      sumMoney += Number(o.count)*Number(o.FD_Price)
    })
    return (
      <View className='cart_page'>
        <View className='page_content'>
          {hotFood.filter(o => (o.count||0) >0).map((item,index) => (
            <View key={index} className='hotfood_item'>
              <View className="hotfood_row1">
                  <View className="hotfood_row1_name">{item.FD_Name}</View>
                  <View className="hotfood_row1_ms">买{item.FD_MaiCount}送{item.FD_SongCount}</View>
                </View> 
              <View className="hotfood_row2">
                  <View className="hotfood_row2_price">¥{item.FD_Price}</View>
                  <View className="hotfood_row2_operate">
                    <Stepper 
                    min={0}
                    max={10}
                    value={item.count}
                    showNumber
                    onChange={(val)=>{this.onChangeStepper(val,item)}}
                    />
                  </View>
              </View> 
            </View>
          ))}
          <AtButton type='primary' size='normal' className='return_btn' onClick={this.goback}>返回</AtButton>
        </View>
        <View className='page_footer'>
          <View className='page_footer_left'>
              合计:¥ {sumMoney}
          </View>
          <View className='page_footer_right'>
             <View className='immediateOrder'>立即落单</View>
             <View className='immediatePay'>立即支付</View>
          </View>
        </View>
      </View>
    )
  }
}
