// import '@tarojs/async-await'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import dva from './dva'
import models from './models'

import './custom-theme.scss'
import './app.scss'

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  onError(e, dispatch) {
  },
})
const store = dvaApp.getStore();

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return (
     <Provider store={store}> 
     {this.props.children}
    </Provider>
    )
     
  }
}
export default App
