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

//订单取消后关闭订单
export function guestClosePay (params,callback){
  window.g_app._store.dispatch({
    type: 'bill/guestClosePay', 
    payload: params,
    callback : (res)=>{
       if(callback){
        callback(res);
       }
    }             
  });
}

// 格式化日期yyyy-MM-dd hh:mm:ss
export const formatDate = (date, fmt) => {
  if (!date) {
      return ''
  }
  var o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
  }
  return fmt
}

let pingInterval = null;
export const startPing = () => {
  if (pingInterval)
  clearInterval(pingInterval);  
  pingInterval = setInterval(()=>{    
      window.g_store.dispatch({
        type: 'home/reloadToken', 
        params: {},              
      })
    }, 1000 * 60);  
}

export const add = (x,y) =>{
  return x+y
}