import Taro from '@tarojs/taro'
export function showToast(msg,icon='success',duration=2000){
  Taro.showToast({
    title: msg,
    icon: icon,
    duration
  });
}

export function  showModal (title,content,callback){
  Taro.showModal({
    title,
    content,
    showCancel: false,
    success: res => {
      if (res.confirm) {
        // console.log('用户点击确定')
        if(callback) callback(res)
      }
    }
  });
}