import { getFoodType , getFoodList } from '../servies/api'
import { showToast } from '../utils/taro.utils'
export default {
  namespace: 'order',
  state: {
    foodType: [],
    foodList: [],
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
    *getFoodType({payload},{call,put,select}){
      const result = yield call(getFoodType,payload);
      if (!result)
      return;
      if (result.msg && result.msg !== ''){
        showToast(result.msg,'fail');
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
  },
};
