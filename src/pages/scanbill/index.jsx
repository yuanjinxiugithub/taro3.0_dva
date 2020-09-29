import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View } from '@tarojs/components'
import Stepper from '../../components/Stepper/index'
import {getScanStateString} from '../../utils/taro.utils'
import { ENV } from '../../utils/const'
import { AtBadge, AtAvatar } from 'taro-ui'
import './index.scss'
@connect(({home, loading, bill}) => ({
  home, loading, bill
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
      },{
        text:"个人中心",
        iconSrc: "/assets/cunjiu@2x.png",
        directUrl: "/pages/person/person",
     },{
      text:"测试页面",
      iconSrc: "/assets/cunjiu@2x.png",
      directUrl: "/pages/test/test",
   },{
    text:"图标插件使用",
    iconSrc: "/assets/cunjiu@2x.png",
    directUrl: "/pages/chart/index",
   }],
   loading: true,
  }

  componentWillMount () { 
   
  }

  componentDidMount () {
    const { dispatch, home: { OpenID } } = this.props;
    //调用扫码
    Taro.scanCode({
     // onlyFromCamera: true,
      success: res=>{
        if(res.result){
          dispatch({
            type: 'home/getRealUrl',
            payload:{ Url:res.result},
            callback: result =>{
             const CS_ID = "93d32d97381a42669f074cd33f55d38e";
             const R_ID =  "6fc556482df2454fb820e0221bc8ce9a";
             if(CS_ID!=""&&R_ID!=""){
               this.getBill({CS_ID,R_ID,OpenID})
             }
            }
          });
        }
      }
    })
  }
  
  getBill = (params) => {
    const { dispatch } = this.props
    dispatch({
      type:'bill/getScanBill',
      payload: params,
      callback: res=>{
        console.log(res)
        if(res.err == 0){
          if (res.KeDianDanFanWei == 0 || ENV === 'localhost') {
            this.setState({loading: false});
          }else{

          }
        }
        // if (res.msg && res.msg !== '') {
				// 	this.setState({ modal1: true, msg: res.msg });
				// 	return false;
				// }
      }
    });
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onClickMenu (item) {
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
    const { menuList, loading } = this.state;
    const { home: { hotFood }, 
           bill: { CS_Name, RoomName,MT_State,DingFangRen,NeedPay,MT_HuaDan_WeiJie,ZhangDanMode }} = this.props;
    let sumCount = 0;
    hotFood.map(o => {
      sumCount += Number(o.count||0)
    });
    return (
      <View className='page'>
        {!loading &&<>
        <View className='header'>
          <View className='header_left'>
            <AtAvatar className='header_left_img' circle image="http://thirdwx.qlogo.cn/mmopen/ajNVdqHZLLCudqg5zBCIGMj1PTsSkbjLOHllGDY1k2EBT9ZSpBJJtF7FRdBib8vB6b1g831zwcVOSfPsibrLCEkg/132" />
            <View className='header_left_text'>
                <View className="header_left_text_cs">{CS_Name}</View>
                <View>欢迎光临，李四</View>
            </View>
          </View>
          <View className='header_right'>
            <View className='header_right_room'>{RoomName}</View>
            <View className='header_right_state'>
              { MT_State === 'I' && <>消费中</>}
              { MT_State === 'S' && <>结账中</>}
              { MT_State === 'L' && <>清洁中</>}
            </View>
          </View>
        </View>
        <View className='content'>
          {/* 账单信息 */}
          <View className='server_bill'>
          {ZhangDanMode != 0 && (Number(NeedPay) > 0 || Number(MT_HuaDan_WeiJie) > 0) &&
           <View>
             <View>您有未支付订单</View>
           </View>
          }

          </View>
          {/* 菜单按钮 */}
          <View className='server_menu'>
            <View className='menu_title'>请选择您需要的服务</View>
            {DingFangRen!="" &&
            <View className='menu_dingfanren'>如有需要请联系您的专职服务经理：{DingFangRen}</View>
            }
            {menuList.map((item,index) => (
             <View key={index} className='menu_item' onClick={() => this.onClickMenu(item)}>{item.text}</View>
             )) }
          </View>
          {/* 热门酒水 */}
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
                     value={Number(item.count||0)}
                     readOnly ={false}
                     onChange={(val) => this.onChangeStepper(val,item)}
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
        </>}
      </View>
    )
  }
}
