import Taro from '@tarojs/taro'
import { baseURL } from './const'

export const  getAuthCode = (successCallBack) =>{
  Taro.login({
    success: res=> {
      successCallBack(res.code)
    },
    fail: res => console.log(res),
    complete: res => console.log(res)
  });
}

/**
 * request 请求
 */
export const request = (url,data,method='POST') => {
  let token = wx.getStorageSync('token');
  let header = {'content-type': 'application/json'}
  header['authorization'] = 'Bearer '+ token;
  return new Promise((resolve,reject) => {
    wx.request({
      url: `${baseURL}${url}`,
      data,
      method,
      header,
      success: res => resolve(res),
      fail: res => reject(res),
      complete: res => {}
    });
  }).then(res => {
  let { statusCode } = res;
  console.log(statusCode)
  if (statusCode >= 200 && statusCode < 300) {
    return res.data;
  } else if(statusCode == 401){
    wx.showToast({
      title: '401授权失效',
      icon: 'fail',
      duration: 3000
    });
    wx.navigateBack({
      delta: 0
    })
  }
  else {
    throw new Error(`网络请求错误，状态码${statusCode}`);
  }
  });
}