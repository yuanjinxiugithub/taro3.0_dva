import Taro from '@tarojs/taro'

export const  getAuthCode = (succCallBack,failCallBack,completeCallBack) =>{
  Taro.login({
    success: res=> {  
      if(succCallBack)
      succCallBack(res);
      if(res.code){
        //发起网络请求
      }
    },
    fail: res => { 
      if(failCallBack)
      failCallBack(res);
    },
    complete: res => { 
      if(completeCallBack)
      completeCallBack(res);
    }
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