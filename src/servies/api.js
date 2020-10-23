import { request } from '../utils/utils'
const API = {
  guestLogin: '/guest/login',//扫码登录接口
  guestScan: '/guest/scan', //扫码结账
  getFoodType: '/front/foodType/list',
  getFoodList: '/front/foodItem/list',
  getRealUrl: '/url/real',
  guestCheckPay: '/guest/check/pay', //检查是否有客人正在支付
  guestClosePay: '/guest/close/pay',//关闭未支付订单
  guestBillPay : '/guest/bill/pay', //账单支付
  getRechargeList: '/system/vipCardType/rechargeList',//咨客收银-会员卡充值列表
  getVipCardList: '/system/vipCardType/list',//咨客收银-会员卡类型列表
  getPromotionList: '/guest/promotion',//酒水促销列表

}

// module.exports = ApiMethod;
export const guestLogin = async  (params) => {
  return request(API.guestLogin, params);
};

export const getToken = async (params) => {
  return request(API.guestScan,params)
}

export const getFoodType = async (params) => {
  return request(API.getFoodType,params,"GET")
}

export const getFoodList = async (params) => {
  return request(API.getFoodList,params,"GET",true)
}

export const getRealUrl = async(params) => {
  return request(API.getRealUrl,params)
}

export const getScanBill = async(params) => {
  return request(API.guestScan,params,"POST",true)
}

export const guestCheckPay = async(params) =>{
  return request(API.guestCheckPay,params)
}

export const guestClosePay = async(params)=>{
  return request(API.guestClosePay,params)
}

export const guestBillPay = async(params)=>{
  return request(API.guestBillPay,params)
}

export const getRechargeList = async(params)=>{
  return request(API.getRechargeList,params)
}
export const getVipCardList = async(params)=>{
  return request(API.getVipCardList,params)
}
export const getPromotionList = async(params)=>{
  return request(API.getPromotionList,params)
}