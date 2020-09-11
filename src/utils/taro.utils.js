import Taro from '@tarojs/taro'
export function showToast(msg,icon='success',duration=2000){
  Taro.showToast({
    title: msg,
    icon: icon,
    duration
  });
}