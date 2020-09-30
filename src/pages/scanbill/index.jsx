import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Text, Image } from '@tarojs/components'
import Stepper from '../../components/Stepper/index'
import PayWay from '../../components/PayWay/index'
import { ENV , WXPay, AliPay, YaJinPay } from '../../utils/const'
import { showToast, guestClosePay} from '../../utils/taro.utils'
import { tradePay } from '../../utils/utils'
import { AtBadge, AtAvatar } from 'taro-ui'

import IconXiaoFei from '../../assets/icon_xiaofei.png';
import IconHuaDanPay from '../../assets/icon_huadan.png';
import IconHuaDan from '../../assets/huadan@3x.png';
import IconFangTai from '../../assets/bill_food@3x.png';
import './index.scss'
@connect(({home, loading, bill}) => ({
  home, loading, bill
}))
export default class Index extends Component {
  constructor(props){
    super(props)
    this.state = {
     loading: true,
     iconName: '',
     showList: 'none',
     showList2: 'none',
     isToggleOn: true,
     isToggleOn2: true,
     ENV: process.env.TARO_ENV,
     payway: process.env.TARO_ENV=='alipay'?'ali':'wx', //房台支付方式
     //hdpayway: process.env.TARO_ENV=='alipay'?'ali':'wx', //花单
    }
  }

  componentWillMount () { 
  }

  componentDidMount () {
    const { dispatch, home: { OpenID } } = this.props;
    //调用扫码
    // Taro.scanCode({
    //  // onlyFromCamera: true,
    //   success: res=>{
    //     if(res.result){
    //       dispatch({
    //         type: 'home/getRealUrl',
    //         payload:{ Url:res.result},
    //         callback: result =>{
    //          const CS_ID = "93d32d97381a42669f074cd33f55d38e";
    //          const R_ID =  "6fc556482df2454fb820e0221bc8ce9a";
    //          if(CS_ID!=""&&R_ID!=""){
    //            this.getBill({CS_ID,R_ID,OpenID})
    //          }
    //         }
    //       });
    //     }
    //   }
    // })

    this.test()
  }

  test = () => {
    const { dispatch, home: { OpenID } } = this.props;
    const CS_ID = "93d32d97381a42669f074cd33f55d38e";
    const R_ID =  "6fc556482df2454fb820e0221bc8ce9a";
    if(CS_ID!=""&&R_ID!=""){
      this.getBill({CS_ID,R_ID,OpenID})
    }
  }
  
  getBill = (params) => {
    const { dispatch } = this.props
    dispatch({
      type:'bill/getScanBill',
      payload: params,
      callback: res=>{
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

  onChangePayWay = (payway) => {
   this.setState({payway})
  }

  handlePay = (type,payMoney,flag) => { //type order 账单支付 huadan花单支付 all 共同支付
    const { payway } = this.state
    const { bill: { YuShouJinE } } = this.props;
    const bAllYaJinPay = (YuShouJinE > 0 && (payMoney - YuShouJinE) <= 0);
    if(bAllYaJinPay && payway !== 'yajin'){
      Taro.showModal({
        title: '提示',
        content: '确定从押金余额抵扣吗?',
        success: function (res) {
          if (res.confirm) {
            this.handleExecutePay(type,payMoney,flag)
          } else if (res.cancel) {
           
          }
        }
      });
    }else{
      this.handleExecutePay(type,payMoney,flag)
    }
  }

  handleExecutePay = (type, payMoney,flag) => { 
    //待优化 点击不同按钮 其他按钮不能在点击
    const { payway, ENV } = this.state;
    const {home: { OpenID }, bill: { MT_ID, MT_RowVer, YuShouJinE, PayList, RoomName, VipInfo, M_ID } } = this.props;
    if (OpenID === "") {
      showToast("未获取到微信用户OpenId",'fail');
      return;
    }
    const params = { MT_ID, RowVer: MT_RowVer, OpenID };
    const realPayMoney = (payMoney - YuShouJinE) <= 0 ? 0 : (payMoney - YuShouJinE);
    const bAllYaJinPay = (YuShouJinE > 0 && (payMoney - YuShouJinE) <= 0);
    params.data = [];
    params.Pay = ENV == 'wx'?0:1;  
    switch(type){
      case 'all':
        params.data = PayList.map(o => { return { F_ID: o.F_ID, RowVer: o.RowVer } });
        params.Flag = '0';
         break;
      case 'huadan':
        params.data = PayList.filter(o => o.F_HuaDanFlag > 0).map(o => { return { F_ID: o.F_ID, RowVer: o.RowVer } });
        params.Flag = '2';
        break;  
      case 'order':
        params.data = PayList.filter(o => o.F_HuaDanFlag == '0').map(o => { return { F_ID: o.F_ID, RowVer: o.RowVer } });
        params.Flag = '1';
        break;  
      default:
        break;  
    }
    if(payway == 'vip') {//会员卡支付
      if(this.handleUserIsRegister()){
        let len = VipInfo.length;
        if (len > 0) {
          if (bAllYaJinPay || YuShouJinE == 0)
             params.OnlyVip = 1;
             this.handlePayByVip(bAllYaJinPay ? payMoney : realPayMoney, params);
        } else {
          // document.getElementById("huiyuan").scrollIntoView(true);
          // Toast.fail("您还不是会员，请先领取会员卡!", 2);
        }
      }
    }else{
     // Toast.loading("请求中...")
      params.VCM_ID = "";
      this.handleCheckPay(params, bAllYaJinPay); 
    }
  }
  //检查是否有正在支付的账单
  handleCheckPay = (params, bAllYaJinPay) => {
    const { dispatch, bill: { MT_ID } } = this.props;
    dispatch({
      type: 'bill/guestCheckPay',
      payload: { MT_ID },
      callback: (res) => {
        if (res.msg) {
          Taro.showModal({
            title: '提示',
            content: '有人正在支付该账单，点击确定继续支付？',
            success: function (res) {
              if (res.confirm) {
                //关闭正在支付的订单
                guestClosePay({ tradeNo: res.TradeNo }, () => {
                  this.handleGuestPayBill(params, bAllYaJinPay);
                });
              } 
            }
          })
        } else {
          this.handleGuestPayBill(params, bAllYaJinPay);
        }
      }
    });
  }

  handleGuestPayBill = (params, bAllYaJinPay) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'bill/guestBillPay',
      payload: params,
      callback: res => {
        if (bAllYaJinPay) {
          if (res.err !== 1) {
           showToast('押金抵扣成功！',"success")
            setTimeout(() => this.reloadScanData(), 2000);
          }
        }else{
          if (res.err !== 1) {
            //调用小程序支付
            tradePay({out_trade_no: res.out_trade_no},(res)=>{
                 
            })
            // Taro.requestPayment({
            //   timeStamp: '',
            //   nonceStr: '',
            //   package: '',
            //   signType: 'MD5',
            //   paySign: '',
            //   success: function (res) { },
            //   fail: function (res) { }
            // })
          }
        }
      }
    });
  }

  handlePayByVip = (needpay, params) => { 
    // 跳转至会员支付

  }
  
  handleUserIsRegister = () => {
    const {bill:{ M_ID }} = this.props
    if (M_ID === 0 || M_ID === "") { // 临时用户
      showToast("系统检测到您暂未注册,请先注册!", 'fail');
      //跳转至注册页面
      // Control.go('/main/register', { M_ID, MT_ID, RoomName });
      return false;
    }
    return true;
  }

  reloadScanData = () =>{ //重新刷新账单
    console.log('reload loading')
  }

  render () {
    const {ENV, payway, loading, iconName, showList, showList2, isToggleOn, isToggleOn2 } = this.state;
    const { home: { hotFood }, 
           bill: { SettleMode, CS_Name, RoomName,
            MT_State,DingFangRen,NeedPay,MT_HuaDan_WeiJie,
            ZhangDanMode,WillPayMoney,YuShouJinE ,PayedMoney,
            UseVipNeedPay, getLocation,PayList,MT_HuaDan_HeJi,
            MT_HuaDan_YiJie,ZW_Right_InputFolio }} = this.props;
    const menuList = [{
          text:"点单",
          iconSrc: "/assets/caipin-@2x.png",
          directUrl: "/pages/order/index",
          show: (MT_State=='I' || MT_State=='S') && (ZhangDanMode == 0 || (Number(NeedPay) <= 0 && Number(MT_HuaDan_WeiJie) <= 0)),
          },{
          text:"点花点跳",
          iconSrc: "/assets/huadanmenu@2x.png",
          directUrl: "/pages/order/index",
          show: (MT_State=='I' || MT_State=='S') && (ZhangDanMode == 0 || (Number(NeedPay) <= 0 && Number(MT_HuaDan_WeiJie) <= 0)),
          },{
            text:"房台详情",
            iconSrc: "/assets/qujiu@2x.png",
            directUrl: "/pages/order/index",
            show: (MT_State=='I' || MT_State=='S' || MT_State == 'L') && ZW_Right_InputFolio == "1",
          },{
            text:"取酒",
            iconSrc: "/assets/qujiu@2x.png",
            directUrl: "/pages/order/index",
            show: (MT_State=='I' || MT_State=='S' || MT_State == 'L') && ZW_Right_InputFolio == "1"
          },{
            text:"存酒",
            iconSrc: "/assets/cunjiu@2x.png",
            directUrl: "/pages/order/index",
            show: (MT_State=='I' || MT_State=='S' || MT_State == 'L') && ZW_Right_InputFolio == "1"
          },{
            text:"个人中心",
            iconSrc: "/assets/cunjiu@2x.png",
            directUrl: "/pages/person/person",
            show: false,
         },{
            text:"测试页面",
            iconSrc: "/assets/cunjiu@2x.png",
            directUrl: "/pages/test/test",
            show: false,
       },{
            text:"图标插件使用",
            iconSrc: "/assets/cunjiu@2x.png",
            directUrl: "/pages/chart/index",
            show: false,
                     }] 
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
          <View className='server_bill' style={{ marginBottom: ZhangDanMode != 0 && Number(NeedPay) + Number(MT_HuaDan_WeiJie) > 0 ? '20PX' : '5PX' }}>
          {ZhangDanMode != 0 && (Number(NeedPay) > 0 || Number(MT_HuaDan_WeiJie) > 0) &&
           <View >
             <View className="server_bill_title">您有未支付订单</View>
             {/* 房台消费 */}
             {NeedPay > 0 &&
              <View className='server_bill_xiaofei'>
                <View className="xiaofei_icon" >
                  <Image alt="" src={IconFangTai} />
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
                <View className="payWay" style={{ borderTop: (isToggleOn && SettleMode == '1' || SettleMode == '0') ? "1px dashed #d1d1d1" : "none" }}>
                 <View className="payTitle">支付方式</View>
                  {(YuShouJinE > 0 && YuShouJinE >= NeedPay) ?
                    <PayWay 
                    wayList ={YaJinPay}
                    checkedValue={payway}
                    onChange = {this.onChangePayWay}
                    /> :
                    <PayWay 
                    wayList ={ENV == "alipay"?AliPay:WXPay}
                    checkedValue={payway}
                    onChange = {this.onChangePayWay}
                    />
                  }
                 </View>
               }
               {/*房台消费 支付按钮 */}
               {MT_HuaDan_WeiJie>0 &&
                <View className="payButton" onClick={()=>{this.handlePay('order',NeedPay)}}>
                 <Image mode="aspectFit"  src={IconXiaoFei} className="xiaofeiIcon"/>
                 {YuShouJinE>0?(
                    YuShouJinE >= NeedPay ?
                    <View>
                      {payway=='yajin'&&<>押金抵扣</>}
                      {payway=='vip'&&<>会员卡支付</>}
                      <Text style={{fontSize:'20PX'}}>{NeedPay}</Text>元
                    </View>:
                    <View>
                      <Text>押金抵扣</Text>
                      <Text style={{ fontSize: '20px' }}>{YuShouJinE}</Text>元+
                      {payway=='wx'&&<>微信支付</>}
                      {payway=='ali'&&<>支付宝支付</>}
                      {payway=='vip'&&<>会员卡支付</>}
                      <Text style={{ fontSize: '20px' }}>{NeedPay - YuShouJinE}</Text>元
                    </View>
                  ):(<View>
                      {payway=='wx'&&<>微信支付</>}
                      {payway=='ali'&&<>支付宝支付</>}
                      {payway=='vip'&&<>会员卡支付</>}
                      <Text style={{ fontSize: '20px' }}>{NeedPay}</Text>元
                  </View>)
                 }
                </View>
               }
              </View>
             }
             {/* 房台花单 */}
             {MT_HuaDan_WeiJie > 0 &&
             <View className="server_bill_huadan">
                <View className="huadan_icon" >
                  <Image alt="" src={IconHuaDan} />
                </View> 
                <View className="huadan_sum" style={{ borderBottom: SettleMode == '0' && MT_State !== "S" ? "1px dashed #d1d1d1" : "none" }}>
                  <View className={'line1'}>
                    <Text className="name">房台:<Text className="roomName">{RoomName}</Text></Text>
                    <Text className="price">花单合计:<Text className="sumPrice">¥{MT_HuaDan_HeJi}</Text></Text>
                  </View> 
                  {MT_HuaDan_YiJie>0 &&
                  <View className={'line1'}>
                    <Text className="name">已支付花单:<Text className="sumPrice">¥{MT_HuaDan_YiJie}</Text></Text>
                    <Text className="price">未支付花单:<Text className="sumPrice">¥{MT_HuaDan_WeiJie}</Text></Text>
                  </View> 
                  }
                  { YuShouJinE > 0 &&
                  <View className='line1'>
                    <Text className="name">押金余额:<Text className="sumPrice">¥{YuShouJinE}</Text></Text>
                    <Text className="price">本次支付:<Text className="sumPrice">￥{(MT_HuaDan_WeiJie - YuShouJinE) <= 0 ? 0 : (MT_HuaDan_WeiJie - YuShouJinE)}</Text></Text>
                  </View> 
                  }
                  {(ZhangDanMode == '3' && SettleMode == '0' || SettleMode == '1') &&
                   <View className='line2'>
                     <View style={{flex:1,textAlign:'left'}}>{"花单项目：" + HDNum}项</View>
                     {getLocation &&
                      <View className="iconBox" onClick={this.goBillDetail2}>
                        {SettleMode == '0' ? '账单详情' : "订单详情"}
                        {/* 待修改 */}
                        <Text className={`iconfont  ${iconName2}`} style={{ marginLeft: '2px' }}></Text>
                      </View>
                     }
                   </View>
                  }
                </View>
                 {/* 待完善 花单详情 */}
                <View></View> 
                {/* 支付方式 */}
                <View className="payWay" style={{ borderTop: "1px dashed #d1d1d1" }}>
                  <View className="payTitle">支付方式</View>
                  {(YuShouJinE > 0 && YuShouJinE >= MT_HuaDan_WeiJie) ?
                   <PayWay 
                    wayList ={YaJinPay}
                    onChange = {this.onChangePayWay}
                    checkedValue={payway}
                    /> :
                    <PayWay 
                    wayList ={ENV == "alipay" ? AliPay:WXPay}
                    onChange = {this.onChangePayWay}
                    checkedValue={payway}
                    />}
                </View>
                {/*房台花单 支付按钮 */}
                { NeedPay>0 &&
                <View className="payButton" style={{background:'#ff3d76'}} onClick={()=>{this.handlePay('huadan',MT_HuaDan_WeiJie)}}>
                 <Image mode="aspectFit"  src={IconHuaDanPay} className="xiaofeiIcon"/>
                 {YuShouJinE>0?(
                   YuShouJinE >= MT_HuaDan_WeiJie ?
                   <View>
                     {payway=='yajin'&&<>押金抵扣</>}
                     {payway=='vip'&&<>会员卡支付</>}
                     <Text style={{fontSize:'20PX'}}>{MT_HuaDan_WeiJie}</Text>元
                   </View>:
                   <View>
                     <Text>押金抵扣</Text>
                     <Text style={{ fontSize: '20px' }}>{YuShouJinE}</Text>元+
                     {payway=='wx'&&<>微信支付</>}
                     {payway=='ali'&&<>支付宝支付</>}
                     {payway=='vip'&&<>会员卡支付</>}
                     <Text style={{ fontSize: '20px' }}>{MT_HuaDan_WeiJie - YuShouJinE}</Text>元
                   </View>
                 ):(<View>
                     {payway=='wx'&&<>微信支付</>}
                     {payway=='ali'&&<>支付宝支付</>}
                     {payway=='vip'&&<>会员卡支付</>}
                     <Text style={{ fontSize: '20px' }}>{MT_HuaDan_WeiJie}</Text>元
                 </View>)
                }
               </View>
                }
             </View>
             }
           </View>
          }
          </View>
          {/* 菜单按钮 */}
          <View className='server_menu'>
            <View className='menu_title'>请选择您需要的服务</View>
            {DingFangRen!="" &&
            <View className='menu_dingfanren'>如有需要请联系您的专职服务经理：{DingFangRen}</View>
            }
            {menuList.map((item,index) => {
              if(item.show){
                return <View key={index} className='menu_item' onClick={() => this.onClickMenu(item)}>{item.text}</View>
              }
            }) }
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
        {sumCount>0 &&
          <AtBadge value={sumCount} maxValue={99} className='cart-badge'>
            <View className='cart-btn' onClick={this.onClickCart}>购物车</View>
          </AtBadge>
        }
        {ZhangDanMode !== 0 && (Number(NeedPay) > 0 || Number(MT_HuaDan_WeiJie) > 0) &&
        <View  className="bottomFooter">
         {/* 底部-合计(消费+花单)-支付按钮 */}
         {Number(MT_HuaDan_WeiJie) > 0 && Number(NeedPay) > 0 &&
          <View className="bottomBtn" onClick={()=>{this.handlePay("all",NeedPay + MT_HuaDan_WeiJie)}}>
            <Image mode="aspectFit"  src={IconXiaoFei} className="icon"/>
            <Image mode="aspectFit"  src={IconHuaDanPay} className="icon"/>
            {YuShouJinE > 0 ? (
               YuShouJinE >= NeedPay ?
               <View>
                 {payway=='yajin'&&<>押金抵扣</>}
                 {payway=='vip'&&<>会员卡支付</>}
                 <Text style={{ fontSize: '20px' }}>{NeedPay}</Text>元
               </View>:
               <View>
                 押金抵扣<Text style={{ fontSize: '20px' }}>{YuShouJinE}</Text>元+
                 {payway=='wx'&&<>微信支付</>}
                 {payway=='ali'&&<>支付宝支付</>}
                 {payway=='vip'&&<>会员卡支付</>}
                 <Text style={{ fontSize: '20px' }}>{NeedPay - YuShouJinE}</Text>元
               </View>
            ):(<View>
                 {payway=='wx'&&<>微信支付</>}
                 {payway=='ali'&&<>支付宝支付</>}
                 {payway=='vip'&&<>会员卡支付</>}
                 <Text style={{ fontSize: '20px' }}>{NeedPay}</Text>元
            </View> ) }
         </View>
         }
         {/* 底部-房台花单-支付按钮 */}
         {Number(MT_HuaDan_WeiJie) > 0 && Number(NeedPay) <= 0 &&
          <View className="bottomBtn" onClick={()=>{this.handlePay("huadan",Number(MT_HuaDan_WeiJie))}} style={{background: '#ff3d76'}}>
            <Image mode="aspectFit"  src={IconHuaDanPay} className="icon"/>
            {YuShouJinE > 0 ?(
               YuShouJinE >= MT_HuaDan_WeiJie ?
               <View>
                 {payway=='yajin'&&<>押金抵扣</>}
                 {payway=='vip'&&<>会员卡支付</>}
                 <Text style={{ fontSize: '20px' }}>{NeedPay}</Text>元
               </View>:
               <View>
                 押金抵扣<Text style={{ fontSize: '20px' }}>{YuShouJinE}</Text>元+
                 {payway=='wx'&&<>微信支付</>}
                 {payway=='ali'&&<>支付宝支付</>}
                 {payway=='vip'&&<>会员卡支付</>}
                 <Text style={{ fontSize: '20px' }}>{MT_HuaDan_WeiJie - YuShouJinE}</Text>元
               </View>
            ):(<View>
                {payway=='wx'&&<>微信支付</>}
                {payway=='ali'&&<>支付宝支付</>}
                {payway=='vip'&&<>会员卡支付</>}
                <Text style={{ fontSize: '20px' }}>{MT_HuaDan_WeiJie}</Text>元
              </View>
            )}
          </View>
         }
         {/* 底部-房台消费-支付按钮 */}
         {Number(MT_HuaDan_WeiJie) <= 0 && Number(NeedPay) > 0 &&
         <View  className="bottomBtn" onClick={()=>{this.handlePay("order",Number(NeedPay))}} style={{background: '#ff7611'}}>
            <Image mode="aspectFit"  src={IconXiaoFei} className="icon"/>
            { YuShouJinE > 0 ?(
               YuShouJinE >= NeedPay ?
               <View>
                 {payway=='yajin'&&<>押金抵扣</>}
                 {payway=='vip'&&<>会员卡支付</>}
                 <Text style={{ fontSize: '20px' }}>{NeedPay}</Text>元
              </View>:
              <View>
                  押金抵扣<Text style={{ fontSize: '20px' }}>{YuShouJinE}</Text>元+
                 {payway=='wx'&&<>微信支付</>}
                 {payway=='ali'&&<>支付宝支付</>}
                 {payway=='vip'&&<>会员卡支付</>}
                 <Text style={{ fontSize: '20px' }}>{NeedPay - YuShouJinE}</Text>元
              </View>
            ):(
            <View>
                {payway=='wx'&&<>微信支付</>}
                {payway=='ali'&&<>支付宝支付</>}
                {payway=='vip'&&<>会员卡支付</>}
                <Text style={{ fontSize: '20px' }}>{NeedPay}</Text>元
            </View>)}
         </View>
         }
        </View>
        }
        </>}
      </View>
    )
  }
}
