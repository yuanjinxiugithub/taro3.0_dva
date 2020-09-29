import Taro from '@tarojs/taro'
import { baseURL } from './const'

export  const  getAuthCode =(successCallback) =>{
  my.getAuthCode({
    scopes: 'auth_user',
    success: res => { 
      if(res.authCode && successCallback){
        successCallback(res.authCode);
      }else{
      }
    },
    fail: res => {
      my.alert({
        title: '获取code失败',
        content: res.authErrorScopes,
        success:()=>{
          //退出小程序
        }
      })
    },
    complete: res => {

    }
  })
}

/**
 * request 请求
 */
export const request = (url,data,method='POST') => {
  let token = my.getStorageSync({ key: 'token' }).data||"";
  return new Promise((resolve,reject) => {
    my.request({
      url: `${baseURL}${url}`,
      data,
      method,
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer '+ token,
      },
      success: res => resolve(res)
    })
  }).then(res => {
    let { status } = res;
    if (status >= 200 && status < 300) {
      return res.data;
    } else if(status == 401) {
      my.showToast({
        type:'fail',
        content:'401授权失效',
        duration: 3000,
        success: () =>{}
      })
    } else {
      throw new Error(`网络请求错误，状态码${status}`);
    }
  });
}
