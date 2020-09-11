import Taro from '@tarojs/taro'
import { baseURL } from './const'

export const getAuthCode = (successCallBack) =>{
  console.log('h5 getAuthCode 登陆接口...');
  successCallBack("aabbcc")
}

/**
 * request 请求
 */
export const request = (url,data,method='POST') => {
  let token =  Taro.getStorageSync('token');
  let header = {'content-type': 'application/x-www-form-urlencoded'}
  header['authorization'] = 'Bearer '+ token;
  return Taro.request({
    url: `api${url}`,
    data,
    method,
    header
  }).then((res) => {
    let { statusCode } = res;
    if (statusCode >= 200 && statusCode < 300) {
      return res.data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  });
}