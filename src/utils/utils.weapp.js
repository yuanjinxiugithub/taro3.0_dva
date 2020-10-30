import Taro from '@tarojs/taro'
import { showModal } from '../utils/taro.utils'
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
export const request = (url,data,method='POST',isShowMask = false) => {
  let token = wx.getStorageSync('token');
  let header = {'content-type': 'application/json'}
  header['authorization'] = 'Bearer '+ token;
  if (isShowMask) {
    wx.hideLoading();
    wx.showLoading({ title: '加载中', mask: true });
}
  let params = '';
  if(method == "POST"){
    if (data.hasOwnProperty('page')){
      params = (params===''?`?page=${data.page}`:`${params}&page=${data.page}`);
    }
    if (data.hasOwnProperty('size')){
      params = (params===''?`?size=${data.size}`:`${params}&size=${data.size}`);
    } 
    url = url+params;
  }
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
   wx.hideLoading();
  let { statusCode } = res;
  if (statusCode >= 200 && statusCode < 300) {
    return res.data;
  } else if(statusCode == 401){
    showModal('提示',"401授权失效",(res)=>{
      wx.navigateBack({
        delta: -1
      }); //退出小程序
    });
  }else {
    throw new Error(`网络请求错误，状态码${statusCode}`);
  }
  });
}

//微信小程序支付
export const tradePay = (params,callback) => {
  console.log(params)
  wx.requestPayment({
    timeStamp: '',
    nonceStr: '',
    package: '',
    signType: 'MD5',
    paySign: '',
    success (res) { 
      if(callback){
        callback(res)
      }
    },
    fail (res) { 
      //失败 关闭订单
    }
  })
}