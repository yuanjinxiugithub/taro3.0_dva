import Taro from '@tarojs/taro'
import { baseURL } from './const'

export default function request(url,data,method='POST'){
  let token = "";
  Taro.getStorageSync({
    key: 'token',
    success: (res) => {
     token = res.data
    }
  });
  return Taro.request({
    url: `${baseURL}${url}`,
    data,
    method,
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer 125528671366803456',
    },
  }).then((res) => {
    let { statusCode } = res;
    if (statusCode >= 200 && statusCode < 300) {
      return res.data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  });
}