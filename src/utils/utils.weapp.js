import Taro from '@tarojs/taro'

export const  getAuthCode = (success,fail,complete) =>{
  Taro.login({
    success: res=> console.log(res)
  });
}

export const getUserInfo = () => {
  Taro.getUserInfo({
    success: res => { 
      console.log(res)
      Taro.showToast({
        title: '获取用户信息成功',
        icon: 'success',
        duration: 2000
       });
    },
    fail: res => { 
     Taro.showToast({
      title: '获取用户信息失败',
      icon: 'fail',
      duration: 2000
     });
   }
  })
}