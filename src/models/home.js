import Taro from '@tarojs/taro'
import { guestLogin , getToken, getRealUrl } from '../servies/api'
import { showToast } from '../utils/taro.utils'

export default {
  namespace: 'home',
  state: {
    hotFood: [],
    OpenID: '',
  },

  reducers: {
    changeState(state, action) {
      return {
        ...state,
        ...action,
      };
    },
  },

  effects: {
    *login({payload}, {all, call, put}){
      const result = yield call(guestLogin,payload);
      if(result.err == 0){
        //获取token
        const tokenRes = yield call(getToken,{OpenID: result.WX.openid})
        Taro.setStorageSync('openid',result.WX.openid)
        if(tokenRes.err == 0){
          Taro.setStorageSync('token',tokenRes.Token)
        }
        yield put({
          type: 'changeState',
          OpenID: result.WX.openid,
        })
      }
      if (result.err==1){
        showToast(result.WX.errmsg,'fail');
      }
      return result;
    },

    *getToken({payload},{all,call,put}){
      const result = yield call(getToken,payload);
      // if (token) {//token获取成功成功
      //   startPing();// 通过ping来延长token有效期
      // }
      return result;
    },

    *getRealUrl({payload,callback},{all,call,put}){
      const result = yield call(getRealUrl,payload);
      if(callback){
        callback(result)
      }
      if (result.msg && result.msg !== ''){
        showToast(result.msg,'fail');
      }
    },

    *reloadToken({payload},{all,call,put}){
      console.log('relodtoken')
      //start ping
    },
    
    *load({payload}, {all, call, put}) {
      console.log("dva loading")
    },

    *getHotFood({payload}, {all, call, put}){
      const hotFoodList =  [{
        FD_DanWei: "张",
        FD_ID: "ffff791fdc264731b7eec188df1ae00b",
        FD_MaiCount: "3",
        FD_MaiSongKeLeiJia: "1",
        FD_Name: "芝华士12年12",
        FD_Price: "20",
        FD_SetPrice: "556",
        FD_SongCount: "2",
        Few: "0",
      },{
        FD_DanWei: "张",
        FD_ID: "ffff791fdc264731b7eec188df1ae00111b",
        FD_MaiCount: "3",
        FD_MaiSongKeLeiJia: "1",
        FD_Name: "芝华士13",
        FD_Price: "20",
        FD_SetPrice: "556",
        FD_SongCount: "2",
        Few: "0",
      },{
        FD_DanWei: "张",
        FD_ID: "ffff791fdc264731b7eec188df1ae0011",
        FD_MaiCount: "3",
        FD_MaiSongKeLeiJia: "1",
        FD_Name: "芝华士1",
        FD_Price: "20",
        FD_SetPrice: "556",
        FD_SongCount: "2",
        Few: "0",
      }];
      yield put({
        type: 'changeState',
        hotFood: hotFoodList
      });
    },

    *changeHotFoodCount({payload}, {all, call, put, select}){
      const hotFood = yield select(model => model.home.hotFood)
      let item  = hotFood.find(o => o.FD_ID == payload.id);
      if(item){
        item.count = payload.val
      }
      yield put({
        type: 'changeState',
        hotFood
      })
    },
  },
};
