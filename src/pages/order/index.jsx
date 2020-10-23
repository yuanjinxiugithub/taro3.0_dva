/* eslint-disable react/jsx-indent-props */
import  React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Text , ScrollView, Image, Button } from '@tarojs/components'
import Stepper from '../../components/Stepper/index'
import { AtSearchBar } from 'taro-ui'
import classNames  from 'classnames';
import { uploadFileUrl } from '../../utils/const'
import './index.scss'
@connect(({order, loading}) => ({
  order, loading
}))
export default class Index extends Component {
  static options = {
    addGlobalClass: true
  }

  constructor(props){
    super(...arguments);
    this.state = {
      activeMenu: "",
      scrollFoodTop: 0,
      scrollTop: 20,
      scrollIntoView: '',
      scrollIntoView2: '',
      searchVal: "",
    };
  }
  anchorMap = []
  componentWillMount () { 
    const { dispatch } = this.props
    dispatch({
      type: 'order/init',
      payload: {Flag: 4 , R_ID: "6fc556482df2454fb820e0221bc8ce9a", Ver: "93d32d97381a42669f074cd33f55d38e1599715819"},
    });
  }

  componentDidMount () {
    setTimeout(this.calcHeight,1000);
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidUpdate(){ }

  componentDidHide () { }

  calcHeight =  () =>{
    const { order: { foodType }} = this.props
    let scrollTop = 0;
    foodType.map((item,index) => {
      Taro.createSelectorQuery()
      .select(`#id_${index}`)
      .boundingClientRect()
      .exec(rec => {
        this.anchorMap.push({index:index,height:rec[0].height,scrollTop: scrollTop, FT_ID: item.FT_ID});
             scrollTop += rec[0].height;
      });
    });
  }

  onClickMenu = (item,index) => {
    this.setState({activeMenu : item.FT_ID });
    this.setState({scrollIntoView2: `id_${index}`})
  }

  onChangeStepper = (val,item)  => {
    const { dispatch } = this.props
    dispatch({
      type: 'home/onChangeCount',
      payload: { val: val , id: item.FD_ID},
      callback: res => {
      }
    });
  }

  onScrollFood =(e) => {
    const scrollTop = e.detail.scrollTop;
    this.anchorMap.map((item,index) => {
      if(scrollTop >= item.scrollTop && scrollTop <=item.scrollTop +item.height){
        this.setState({ scrollIntoView: `menu_${item.index}` , activeMenu: item.FT_ID });
      }
    });
  }

  onSearch = (v) => {
    this.setState({searchVal:v})
  }

  onActionClick () {
    console.log('开始搜索')
  }
   
  render () {
    const { order:{ foodType, foodList } } =  this.props;
    const { searchVal, activeMenu, scrollFoodTop, scrollIntoView, scrollIntoView2} = this.state
    let sumCount = 0;
    foodList.map(o => {
      sumCount += Number(o.count||0);
    })
    return (
      <View className='page'>
        <View className="page_content">
          <View className='page_left'>
            <ScrollView
            className="scrollView"
            scrollY
            scrollWithAnimation
            onScroll = {this.onScroll}
            scrollIntoView = {scrollIntoView}
            >
          {foodType.map((item,index) => (
              <View  
              id={`menu_${index}`}
              className={
              classNames({
                ["page_left_menu_item"]: true,
                ["page_left_menu_item_active"]: activeMenu == "" ? index == 0: activeMenu == item.FT_ID,
              })}
              key={item.FT_ID}
              onClick={() => { this.onClickMenu(item,index)}}
              >
              {item.FT_Name}
              </View>
              ))
            }
            </ScrollView>
          </View>
          <View className="page_right">
          <ScrollView
          className="scrollView2"
          scrollY
          scrollWithAnimation
          onScroll = {this.onScrollFood}
          scrollTop = {scrollFoodTop}
          scrollIntoView = {scrollIntoView2}
          >
          {foodType.map((item,index) => (
            <View 
            id={`id_${index}`}
            className="page_right_food" 
            key={item.FT_Name}
            >
              <View 
               className="page_right_food_type"
               >
               <Text className="divider"/>
               {item.FT_Name}
               <Text className="divider"/>
              </View>
              {foodList.filter(o => o.FT_ID == item.FT_ID).map((food,index)=>(
                 <View className="page_right_food_item" key={food.FD_ID}>
                    <View className="page_right_food_item_left">
                      <Image 
                      className="page_right_food_item_left_img" 
                      alt="" 
                      src={food.FD_PicUID == ""? "https://jdc.jd.com/img/200": uploadFileUrl+food.FD_PicUID+"?x-oss-process=image/resize,m_fill,h_128,w_140"}></Image>
                    </View>
                    <View className="page_right_food_item_right">
                      <View className="page_right_food_item_right_name">
                        {food.FD_Name}
                      </View>
                      <View className="page_right_food_item_right_price">
                        <Text className="food_price">¥{food.FD_Price}</Text>
                        <Text className="food_danwei">/{food.FD_DanWei}</Text>
                      </View>
                      {food.FD_VipPrice && food.FD_VipPrice >0 &&
                        <View className="page_right_food_item_right_vip">会员价：¥{food.FD_VipPrice}</View>
                      }
                      <View className="page_right_food_item_right_stepper">
                        <Stepper
                        value={0}
                        min={0}
                        max={999}
                        inputWidth='100PX'
                        value={Number(food.count||0)}
                        readOnly ={false}
                        onChange={(val) => this.onChangeStepper(val,food)}
                        />
                      </View>
                    </View>
                 </View>
              ))}
            </View>
          ))}
          </ScrollView>
        </View>
        </View>
        <View className="page_footer">
          <View className="search">
           <AtSearchBar
              value={searchVal}
              onChange={this.onSearch}
              className="serachbar"
              showActionButton={true}
            />
          </View>
          <View className="shopcar">
            <Button className='shopbtn'  size='mini'>
              购物车
             {sumCount>0 && sumCount < 99 && <>({sumCount})</>}
             {sumCount >= 99 && <>(99+)</>}
            </Button>
          </View>
        </View>
      </View>
    )
  }
}
