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

export function startPing(){
  if (pingInterval)
  clearInterval(pingInterval);  
  pingInterval = setInterval(()=>{    
  window.g_app._store.dispatch({
    type: 'home/reloadToken', 
    params: {},              
  })
}, 1000 * 60);  
}

//扫码解析url中的state参数
export function getScanStateString(href,name) {
  let ary = href.split('?');
  if (ary.length > 1){
    let search = ary[1];    
    ary = search.split('#');
    if (ary.length>0)
      search = ary[0];    
    search = encodeURI(search)
    let reg = new RegExp('(^|&)' + 'state' + '=([^&]*)(&|$)', 'i')
    let r = search.match(reg)
    if (r != null) {
      let state = unescape(r[2])
      state = decodeURI(state)        
      reg = new RegExp('(^|;)' + name + '=([^;]*)(;|$)', 'i')     
      r = state.match(reg)    
      if (r != null) {
        let result = unescape(r[2])
        result = decodeURI(result)
        return result
      }
    }
  }
  return '';
}