import { request } from '../utils/utils'
const API = {
  guestLogin: '/guest/login',//扫码登录接口
  guestScan: '/guest/scan', //扫码结账
  getFoodType: '/front/foodType/list',
  getFoodList: '/front/foodItem/list',
  getRealUrl: '/url/real',
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
  return request(API.getFoodList,params,"GET")
}

export const getRealUrl = async(params) => {
  return request(API.getRealUrl)
}

export const getScanBill = async(params) => {
  return request(API.guestScan,params)
}