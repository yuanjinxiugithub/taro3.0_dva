import React , { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Input, Text, Image } from '@tarojs/components'
import classNames  from 'classnames';
import WeiXinIcon from '../../assets/weixin.png'
import VIPIcon  from '../../assets/ly_huiyuanka.png'
import AliIcon  from '../../assets/alipaylogo.png'
import YaJinIcon from '../../assets/icon_yajin.png';
import './index.scss'

export default class index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeItem: props.checkedValue,
    };
  }

  componentDidMount(){
  }

  UNSAFE_componentWillReceiveProps(props){
    if (props.checkedValue !== this.props.checkedValue) {
      this.setState({ activeItem: props.checkedValue });
    }
  }

  onSelect = (item) => {
    const { onChange } = this.props
    this.setState({activeItem: item.id})
    if(onChange)
    onChange(item.id)
  }

  render () {
    const { value, activeItem } = this.state
    const { wayList} = this.props
    return (<View className="payway">
     {wayList.map((item,index)=>(
       <View 
        className="way" 
        key={index} 
        onClick={()=>{this.onSelect(item)}}>
        <View 
        className="circle"
        className={classNames({
          ["circle"]: true,
          ["actived"]: activeItem==""?index==0 : activeItem == item.id,
        })}
        >
          {(activeItem=="" ? index==0 : activeItem == item.id) &&
            <View className="activedinner"></View>
          }
        </View> 
        {item.id=="wx" &&
         <Image mode="aspectFit" className="icon" alt="" src={WeiXinIcon} />
        }
        {item.id=="vip" &&
         <Image  mode="aspectFit" className="icon" alt="" src={VIPIcon} />
        }
        {item.id=="ali" &&
         <Image  mode="aspectFit" className="icon" alt="" src={AliIcon} />
        }
        {item.id=="yajin" &&
         <Image  mode="aspectFit" className="icon" alt="" src={YaJinIcon} />
        }
         {item.title}
      </View>
     ))
     }
    </View>)
  }
}

index.defaultProps = {
 
}
index.propTypes = {
 wayList: PropTypes.array,
}