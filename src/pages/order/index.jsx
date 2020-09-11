import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from '@tarojs/components'
import { AtButton, AtIcon, AtAvatar } from 'taro-ui'
import classNames  from 'classnames';

import './index.scss'
@connect(({order, loading}) => ({
  order, loading
}))
export default class Index extends Component {
  state = {
     activeMenu: ""
  }

  componentWillMount () { 
    const { dispatch } = this.props
    const evn = process.env.TARO_ENV;
    if(evn == "alipay"){
      // my.request({
      //   url: 'https://login.16931.com/PROD/front/foodType/list',
      //   data: { R_ID: "6fc556482df2454fb820e0221bc8ce9a", Ver: "93d32d97381a42669f074cd33f55d38e1599715819"},
      //   headers:{
      //     'content-type':'application/json' , //默认值
      //     'authorization': 'Bearer 125528671366803456',
      //   },
      //   success:  res => console.log(res),
      //   fail: res => console.log(res),
      //   complete: res => console.log(res)
      // });
    }
    if(evn == "weapp"){
      // wx.request({
      //   url: 'https://login.16931.com/PROD/front/foodType/list', //仅为示例，并非真实的接口地址
      //   data: {
      //     R_ID: "6fc556482df2454fb820e0221bc8ce9a", 
      //     Ver: "93d32d97381a42669f074cd33f55d38e1599715819"
      //   },
      //   header: {
      //     'content-type': 'application/json', // 默认值
      //     'authorization': 'Bearer 125528671366803456',
      //   },
      //   success (res) {
      //     console.log(res)
      //   }
      // })
    }
    dispatch({
      type: 'order/getFoodType',
      payload: { R_ID: "6fc556482df2454fb820e0221bc8ce9a", Ver: "93d32d97381a42669f074cd33f55d38e1599715819"},
    });
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onClickMenu = (item) => {
    this.setState({activeMenu : item.FT_ID });
  }

  render () {
    const { order:{ foodType, foodList } } =  this.props;
    const { activeMenu } = this.state
    return (
      <View className='page'>
        <View className='page_left'>
         {foodType.map((item,index) => (
            <View  
            className={classNames({
              ["page_left_menu_item"]: true,
              ["page_left_menu_item_active"]: activeMenu == "" ? index == 0: activeMenu == item.FT_ID,
            })}
            key={item.FT_ID}
            onClick={() => { this.onClickMenu(item)}}
            >
             {item.FT_Name}
            </View>
            ))
          }
        </View>
        <View className="page_right">
         
        </View>
      </View>
    )
  }
}
