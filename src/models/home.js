export default {
  namespace: 'home',
  state: {},
  reducers: {
  },
  effects: {
    * load({payload}, {all, call, put}) {
      console.log("dva loading")
    }
  },
};
