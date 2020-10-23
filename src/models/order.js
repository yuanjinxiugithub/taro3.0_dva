import { getFoodType , getFoodList } from '../servies/api'
import { showToast } from '../utils/taro.utils'
export default {
  namespace: 'order',
  state: {
    foodType: [],
    foodList: [],
    cache: false,
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
    *init({payload, callback },{call,put,select}) {
      const cache = yield select (model => model.order.cache)
     if(!cache){
      const [result,result1 ] = yield [call(getFoodType,payload),
                                        call(getFoodList,payload)]
      if (!result)
      return;
      if (result.msg && result.msg !== ''){
        showToast(result.msg,'fail');
      }
      yield put({
        type: 'changeState',
        foodType: result.data,
      })
      yield put({
        type: 'changeState',
        foodList: result1.data,
        cache: true
      })
      if(callback){
        callback()
      }
      return [result , result1]
     }
    },
    *getFoodType({payload},{call,put,select}){
      const result = yield call(getFoodType,payload);
      if (!result)
      return;
      if (result.msg && result.msg !== ''){
        showToast(result.msg,'none');
      }
      yield put({
        type: 'changeState',
        foodType: result.data,
      })
      return result
    },

    *getFoodList({payload},{call,put,select}){
      const result = yield call(getFoodList,payload);
      if (!result)
      return;
      if (result.msg && result.msg !== ''){
        showToast(result.msg,'fail');
      }
      yield put({
        type: 'changeState',
        foodList: result.data,
      })
      return result
    },

    // *onChangeCount({payload},{call,put,select}){
    //   const foodList = yield select (model => model.order.foodList)
    //   const hotList = yield select (model => model.home.hotFood)
    //   const { count , id } = payload;
    //   const item = foodList.find(o => o.FT_ID == id)
    //   const item2 = hotList.find(o => o.FT_ID == id)
    //   if(item){
    //     item.count = count;
    //   }
    //   if(item2){
    //     item2.count = count;
    //   }
    //   yield put({
    //     type: 'changeState',
    //     foodList,
    //     hotList
    //   });
    // }
  },
};
