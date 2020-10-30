import  React, { Component } from 'react'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import './index.scss'
@connect(({bill, loading}) => ({
  bill, loading
}))
export default class Index extends Component {
  constructor(props){
    super(...arguments);
    this.state = {
      page: 1,
      size: 10,	
      hasMore: true,
      isLoading: true,
      refreshing: true,
      list: [],
      dataSource: []
    };
  }
 
  componentWillMount () { 
   
  }

  componentDidMount () {
    this.getList();
  }


  componentWillUnmount () { }

  componentDidShow () { }

  componentDidUpdate(){ }

  componentDidHide () { 

  }
   
  getList = () => {
    const { dispatch } = this.props
    let { page, size ,hasMore,  list,  } = this.state
    let dataSource = []
    dispatch({
      type:'others/getActorList',
      payload: { page ,size, Flag:"3" },
      callback: res => {
        if(res.err ==0){
          if (res.data.length < size)
            hasMore = false;
            res.data.forEach((item, i) => {
              list.push({ ...item, num: (page - 1) * size + (i + 1) });
            });
            dataSource = dataSource.concat(list)
          this.setState({
            list,
            hasMore,
            isLoading: false,
            refreshing: false,
            dataSource
          });
        }
      }
    });
  }

  onPullDownRefresh(){ // 下拉刷新数据
    this.setState({ hasMore: true, refreshing: true, isLoading: true, page: 1, list: [] }, () => {
      this.getList();
      Taro.stopPullDownRefresh()
    });
  }
  
  onReachBottom = () =>{ //加载更多数据
    const { isLoading, hasMore, page } = this.state;
    if (isLoading || !hasMore) {
			return;
		}
    this.setState({ isLoading: true, page: page + 1 }, () => {
			this.getList();
		});
  }

 
  render () {
    const { list, isLoading, refreshing, dataSource } = this.state
    return (
      <View className="listView">
        {/* {refreshing  &&
         <View className="loadData">
            立即刷新数据
         </View>
        } */}
        {dataSource.map((obj,index)=>(
          <View className="listItem" key={index}>
            {index+1}     {obj.C_YiMing}
          </View>
        )) }
        {!refreshing &&
          <View className="footer">
            {isLoading  ? '数据加载中...' : '已加载全部数据'}
          </View>
        }
      </View>
    )
  }
}
