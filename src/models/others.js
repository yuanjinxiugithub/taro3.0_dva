import { getActorList } from '../servies/api'
import { showToast } from '../utils/taro.utils'
export default {
  namespace: 'others',
  state: {
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
    *getActorList({payload,callback},{call,put,select}){
      const result = yield call(getActorList,payload);
      if (!result)
      return;
      if (result.msg && result.msg !== ''){
        showToast(result.msg,'none');
      }
      if(callback){
        callback(result)
      }
    },

  },
};
