export default {
  namespace: 'home',
  state: {
    hotFood: []
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
    * load({payload}, {all, call, put}) {
      console.log("dva loading")
    },
    * getHotFood({payload}, {all, call, put}){
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
