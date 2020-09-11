import { request } from '../utils/utils'
const API = {
  //扫码登录接口
  guestLogin: '/guest/login',
  scanCode: '/guest/scan',
  getFoodType: '/front/foodType/list',
  getFoodList: '/front/foodItem/list'
}

// let ApiMethod = {}
// Object.keys(API).forEach(key=>{
//   ApiMethod[key] = async (params) => {
//     switch(key){
//       case 'getFoodTypeList':
//       case 'getFoodList':
//         return request(API[key], params, 'GET');
//       default:
//         return request(API[key], params);
//     }    
//   }
// })

// module.exports = ApiMethod;
export const guestLogin = async  (params) => {
  return request(API.guestLogin, params);
};

export const getToken = async (params) => {
  return request(API.scanCode,params)
}

export const getFoodType = async (params) => {
  return request(API.getFoodType,params,"GET")
}

export const getFoodList = async (params) => {
  return request(API.getFoodList,params,"GET")
}