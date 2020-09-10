
export  const  getAuthCode =(success,fail,complete) =>{
  my.getAuthCode({
    scopes: 'auth_user',
    success: res => { 
      if(res.authCode){
        //请求后台登陆接口
        // my.alert({
        //   content: res.authCode
        // });
      }
    },
    fail: res => {
     
    },
    complete: res => {

    }
  })
}

export const getUserInfo = () => {
  my.getOpenUserInfo({
    success: res => { console.log(res)},
    fail: res => console.log(res)
  });
}