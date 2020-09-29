import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Text } from '@tarojs/components'
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
   iconName: '',
   showList: 'none',
   showList2: 'none',
   isToggleOn: true,
   isToggleOn2: true,
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
    const { menuList, loading, iconName, showList, showList2, isToggleOn, isToggleOn2 } = this.state;
    const { home: { hotFood }, 
           bill: { SettleMode, CS_Name, RoomName,
            MT_State,DingFangRen,NeedPay,MT_HuaDan_WeiJie,
            ZhangDanMode,WillPayMoney,YuShouJinE ,PayedMoney,
            UseVipNeedPay, getLocation,PayList}} = this.props;
    let sumCount = 0;
    hotFood.map(o => {
      sumCount += Number(o.count||0)
    });
    const HJNum = PayList.filter(obj => obj.F_TaoCanChild == "0").length;
    const HDNum = PayList.filter(obj => obj.F_TaoCanChild == "0" && obj.F_HuaDanFlag > 0).length;
    const XFNum = PayList.filter(obj => obj.F_TaoCanChild == "0" && obj.F_HuaDanFlag == '0').length;
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
          <View className='server_bill' style={{ marginBottom: ZhangDanMode != 0 && Number(NeedPay) + Number(MT_HuaDan_WeiJie) > 0 ? '50PX' : '5PX' }}>
          {ZhangDanMode != 0 && (Number(NeedPay) > 0 || Number(MT_HuaDan_WeiJie) > 0) &&
           <View >
             <View className="server_bill_title">您有未支付订单</View>
             {/* 房台消费 */}
             {NeedPay > 0 &&
              <View className='server_bill_xiaofei'>
                <View className="xiaofei_icon" >
                  <image alt="" src={"../../assets/bill_food@3x.png"} />
                </View> 
                <View className="xiaofei_sum" style={{ borderBottom: SettleMode == '0' && MT_State !== "S" ? "1px dashed #d1d1d1" : "none" }}>
                  <View className={'line1'}>
                    <Text className="name">房台:<Text className="roomName">{RoomName}</Text></Text>
                    <Text className="price">合计金额:<Text className="sumPrice">¥{WillPayMoney}</Text></Text>
                  </View>
                  { PayedMoney > 0 &&
                   <View className={'line1'}>
                    <Text className="name">已支付金额:<Text className="sumPrice">{PayedMoney}</Text></Text>
                    <Text className="price">未支付金额:<Text className="sumPrice">¥{NeedPay}</Text></Text>
                   </View>
                  }
                  {YuShouJinE>0 &&
                    <View className={'line1'}>
                    <Text className="name">押金余额:<Text className="sumPrice">{YuShouJinE}</Text></Text>
                    <Text className="price">本次支付:<Text className="sumPrice">￥{(WillPayMoney - YuShouJinE) <= 0 ? 0 : (WillPayMoney - YuShouJinE)}</Text></Text>
                   </View>
                  }
                  {SettleMode == 1 && UseVipNeedPay > 0 && Number(UseVipNeedPay) != Number(NeedPay) &&
                    <View className="vippaytip">会员支付只需{UseVipNeedPay},立省{Number(NeedPay) - Number(UseVipNeedPay)}</View>
                  }
                  {(ZhangDanMode == '3' && SettleMode == '0' || SettleMode == '1') &&
                   <View className="line2">
                      <View style={{ flex: 1, textAlign: 'left' }}>
                        {MT_HuaDan_WeiJie > 0 ? "消费项目：" + XFNum : "合计：" + HJNum}项
                      </View>
                      {getLocation &&
                        <View className="iconBox" onClick={this.goBillDetail}>
                          {SettleMode == '0' ? '账单详情' : "订单详情"}<span className={`iconfont  ${iconName}`} style={{ marginLeft: '2px' }}></span>
                        </View>
                      }          
                   </View>
                  }
                </View>
               {/* 先结模式的账单详情 */}
               {showList != 'none' &&
                <View className="xiaofei_list">

                </View>
               }
               {/* 支付方式 */}
               {(SettleMode == '0' && MT_State !== 'I' && NeedPay > 0 || SettleMode == '1' && NeedPay > 0) &&
               <>
               <View className="payWay" style={{ borderTop: (isToggleOn && SettleMode == '1' || SettleMode == '0') ? "1px dashed #d1d1d1" : "none" }}>
                 <View className="payTitle">支付方式</View>
                 {

                 }

               </View>
               </>
               }
              </View>
             }
             {/* 房台花单 */}
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
