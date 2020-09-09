import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Text } from '@tarojs/components'
import Stepper from '../../components/Stepper/index'
import { AtBadge, AtAvatar } from 'taro-ui'

import './index.scss'
@connect(({home, loading}) => ({
  home, loading
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
    dispatch({type: 'home/getHotFood'});
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  omClickMenu (item) {
    Taro.navigateTo({url:item.directUrl})
  }

  onClickCart(){
    Taro.navigateTo({url:'/pages/cart/index'});
  }

  onChangeStepper = (val,item)=>{
    const { dispatch } = this.props
    dispatch({
      type: 'home/changeHotFoodCount',
      payload: { val , id: item.FD_ID }
    })
  }

  render () {
    const { menuList } = this.state;
    const {home: { hotFood }} = this.props;
    let sumCount = 0;
    hotFood.map(o => {
      sumCount += Number(o.count||0)
    });
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
          <View className="server_hotFood">
             <View className='hot_title'>本店正在火热促销的酒水</View>
             {hotFood.map((item,index)=>(
               <View key={index} className='hot_item'>
                <View className='hot_item_name'>{item.FD_Name}</View>
                <View className='hot_item_price'>
                  <View className='hot_item_price_old'>原价:¥{item.FD_SetPrice}/{item.FD_DanWei}</View>
                  <View className='hot_item_price_new'>¥{item.FD_Price}/{item.FD_DanWei}</View>
                </View>
                <View className='hot_item_operate'>
                  <View className='hot_item_operate_ms'>买{item.FD_MaiCount}送{item.FD_SongCount}</View>
                  <View className='hot_item_operate_stepper'>
                    <Stepper
                     value={0}
                     min={0}
                     max={10}
                     inputWidth='100PX'
                     value={item.count||0}
                     readOnly ={false}
                     onChange={(val)=>this.onChangeStepper(val,item)}
                   />
                  </View>
                </View>
               </View>
             ))}
          </View>
        </View>
        <AtBadge value={sumCount} maxValue={99} className='cart-badge'>
          <View className='cart-btn' onClick={this.onClickCart}>购物车</View>
        </AtBadge>
      </View>
    )
  }
}
