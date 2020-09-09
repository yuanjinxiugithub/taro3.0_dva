### 问题记录：
 #### 1 taro3.0.9+ 集成 taro-ui时，taro-ui的版本需要是 "^3.0.0-alpha.3"，否则无法适配;
 #### 2 taro3.0.9+ 版本以上 没有了@Tarojs/redux，集成dvaJS时使用 redux;


### 项目启动:
#### yarn run dev:h5   h5应用
#### yarn run dev:weapp   微信小程序
#### yarn run dev:alipay  支付宝小程序

### 查漏补缺
#### react 生命周期函数 componentWillReceiveProps
简介： 在初始 props不会被调用，它会在组件接受新的props时调用。一般用于父组件更新状态时自组件的重新渲染。在react16.3 之前，componentWillReceiveProps是在不进行额外render前提下，响应props中的改变并更新state的唯一方式。
主要在两种情景使用：
1 当上传的props无条件的更新state
2 当props和state不匹配时更新state
#### react 生命周期函数 getDerivedStateFromProps 替换 componentWillReceiveProps
React16.3 之后，引入了新的生命周期函数getDerivedStateFromProps需要注意的是react16.4版本中getDriverdStateFromProps比react16.3中多了setState forceUpdate两种触发方法。
