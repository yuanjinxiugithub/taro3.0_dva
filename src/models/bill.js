import Taro from '@tarojs/taro'
import { getScanBill, guestCheckPay, guestClosePay, guestBillPay } from '../servies/api'
import { showToast } from '../utils/taro.utils'

export default {
  namespace: 'bill',
  state: {
    M_ID: '',
    MT_ID: '',
    R_ID: '',//房台ID
    CS_ID: '',    //场所ID
    CS_Name: '',    //场所名称
    RoomName: '',
    MT_RowVer: '',
    JiuBaShouKuanFangShi: "",
    LuoDanChuPinFangShi: "",
    NeedPay: 0,  //待支付金额
    WillPayMoney: 0, //总支付金额
    PayedMoney: 0,//已支付金额
    MT_HuaDan_HeJi: 0, //花单合计
    MT_HuaDan_YiJie: 0,//花单已结
    MT_HuaDan_WeiJie: 0,//花单未结
    CanDelete: 0, //0-不 1-可以
    SettleMode: null, // 结算方式 0  1--后结算
    DingFangRen: "", // 订房人
    ClerkName: "",   //员工姓名
    ZW_Right_InputFolio: "",//落单权限，有值时可以直接落单和显示房台详情  对应服务端
    MT_State: '', //房台状态
    ZhangDanMode: null, //账单模式
    YuShouJinE: 0,
    PayList: [],
    VipInfo: [],
    hotFoodList: [],
    rechargeList: [],
    cardTypeList: [],
    shopList: [], //购物车列表
    shopCarNum: 0, //购物车数量
    SystemFlag: 0, //wx 0 or alipay 1
    UseVipNeedPay: 0, //使用会员卡需支付金额
    getLocation: true, //判断用户是否取消获取地理位置
    Rights: {},  //房台详情权限
  },
  reducers: {
    changeState(state, action) {
      return {
        ...state,
        ...action,
      };
    },
  },

  effects: {
    *getScanBill({payload,callback}, {all, call, put}) {
      const result = yield call(getScanBill,payload);
      if (result.msg && result.msg !== ''){
        showToast(result.msg,'none');
      }
      if(result.Bill && result.err === 0){
        let Bill = result.Bill;
        let payList = (Bill.child || []);
        yield put({
          type: 'changeState',
          RoomName: Bill.RoomName,
          SettleMode: result.SettleMode,
          MT_ID: Bill.MT_ID || '',
          M_ID: result.M_ID || '',
          MT_State: Bill.MT_State || '',
          CS_ID: payload.CS_ID || '',
          R_ID: payload.R_ID || '',
          YuShouJinE: result.YuShouJinE,
          PayList: payList || [],
          NeedPay: result.WeiJieXFJinE,
          WillPayMoney: result.MT_WillPayMoney,
          PayedMoney: result.MT_PayedMoney,
          MT_HuaDan_HeJi: result.MT_HuaDan_HeJi,
          MT_HuaDan_YiJie: result.MT_HuaDan_YiJie,
          MT_HuaDan_WeiJie: result.WeiJieHDJinE,//花单未结
          UseVipNeedPay: result.UseVipNeedPay,
          CanDelete: Bill.CanDelete,
          MT_RowVer: Bill.MT_RowVer || '',
          VipInfo: result.VIP || [],
          DingFangRen: Bill.DingFangRen || '',
          ClerkName: result.ClerkName || '',
          ZW_Right_InputFolio: result.ZW_Right_InputFolio||"",
          ZhangDanMode: result.ZhangDanMode,
          CS_Name: result.CS_Name,
        })
      }
      if(callback){
        callback({
          err: result.err,
          msg: result.msg||'',
          NeedPay:  result.WeiJieXFJinE,
          SettleMode: result.SettleMode, 
          MT_HuaDan_WeiJie: result.WeiJieHDJinE,
          Lat: result.Lat,
          Lng: result.Lng,
          KeDianDanFanWei: result.KeDianDanFanWei
        });
      }
    },
    *guestCheckPay({ payload, callback }, { call }) {
      const result = yield call(guestCheckPay, payload);
      if (result.msg && result.msg !== ''){
        showToast(result.msg,'none');
      }
      if (callback)
        callback(result);
    },

    *guestClosePay({ payload, callback }, { call }){
      const result = yield call(guestClosePay, payload);
      if (result.msg && result.msg !== ''){
        showToast(result.msg,'none');
      }
      if (callback)
        callback(result);
    },

    *guestBillPay({ payload, callback }, { call }){
      const result = yield call(guestBillPay, payload);
      if (result.msg && result.msg !== ''){
        showToast(result.msg,'none');
      }
      if (callback)
        callback(result);
    },

  },
};
