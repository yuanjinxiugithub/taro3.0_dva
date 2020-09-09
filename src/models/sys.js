export default {
  namespace: 'sys',
  state: {},
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
  },
  effects: {
    * error({payload: e}, {all, call, put}) {
      console.error("error:", e);
    },
  },
};
