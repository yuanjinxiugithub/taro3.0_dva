import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Text } from '@tarojs/components'
import { AtButton, AtIndexes } from 'taro-ui'
import Stepper from '../../components/Stepper/index'
import classNames  from 'classnames';
import { uploadFileUrl } from '../../utils/const'
import './index.scss'
@connect(({order, loading}) => ({
  order, loading
}))
export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeMenu: ""
    };
  }

  componentWillMount () { 
    const { dispatch } = this.props
    dispatch({
      type: 'order/getFoodType',
      payload: {Flag: 4 , R_ID: "6fc556482df2454fb820e0221bc8ce9a", Ver: "93d32d97381a42669f074cd33f55d38e1599715819"},
    });
    dispatch({
      type: 'order/getFoodList',
      payload: {Flag: 4 , R_ID: "6fc556482df2454fb820e0221bc8ce9a", Ver: "93d32d97381a42669f074cd33f55d38e1599715819"},
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onClickMenu = (item,index) => {
    this.setState({activeMenu : item.FT_ID });
    Taro.pageScrollTo({
      selector: `#id_${index}`,
      duration: 300,
      success: res => { console.log(res)},
      fial: res =>  { console.log(res) }
    });
  }

  onPageScroll= (e) => {
   console.log(e)
  }

  onTouchMove = (e) => {
    console.log(e)
  }

  render () {
    const { order:{ foodType, foodList } } =  this.props;
    const { activeMenu } = this.state
    return (
      <View className='page'>
        <View className='page_left'>
         {foodType.map((item,index) => (
            <View  
            className={
              classNames({
              ["page_left_menu_item"]: true,
              ["page_left_menu_item_active"]: activeMenu == "" ? index == 0: activeMenu == item.FT_ID,
            })}
            key={item.FT_ID}
            onClick={() => { this.onClickMenu(item,index)}}
            >
             {item.FT_Name}
            </View>
            ))
          }
        </View>
        <View className="page_right">
          {foodType.map((item,index) => (
            <View 
            id={`id_${index}`}
            className="page_right_food" 
            key={item.FT_Name}
            >
              <View 
               className="page_right_food_type"
               onTouchMove = {this.onTouchMove}
               >
               <Text className="divider"/>
               {item.FT_Name}
               <Text className="divider"/>
              </View>
              {foodList.filter(o => o.FT_ID == item.FT_ID).map((food,index)=>(
                 <View className="page_right_food_item" key={food.FD_ID}>
                    <View className="page_right_food_item_left">
                      <image 
                      className="page_right_food_item_left_img" 
                      alt="" 
                      src={food.FD_PicUID == ""? "https://jdc.jd.com/img/200": uploadFileUrl+food.FD_PicUID+"?x-oss-process=image/resize,m_fill,h_128,w_140"}></image>
                    </View>
                    <View className="page_right_food_item_right">
                      <View className="page_right_food_item_right_name">
                        {food.FD_Name}
                      </View>
                      <View className="page_right_food_item_right_price">
                        <Text className="food_price">¥{food.FD_Price}</Text>
                        <Text className="food_danwei">/{food.FD_DanWei}</Text>
                      </View>
                      {food.FD_VipPrice && food.FD_VipPrice >0 &&
                        <View className="page_right_food_item_right_vip">会员价：¥{food.FD_VipPrice}</View>
                      }
                      <View className="page_right_food_item_right_stepper">
                        <Stepper
                        value={0}
                        min={0}
                        max={10}
                        inputWidth='100PX'
                        value={Number(item.count||0)}
                        readOnly ={false}
                        onChange={(val) => this.onChangeStepper(val,item)}
                        />
                      </View>
                    </View>
                 </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    )
  }
}
