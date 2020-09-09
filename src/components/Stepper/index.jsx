import React , { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Input } from '@tarojs/components'
import classNames  from 'classnames';
import './index.scss'

export default class index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: props.value,
    };
  }
  componentWillReceiveProps(props){
    if (props.value !== this.props.value) {
      this.setState({ value: props.value });
    }
  }

  onClickOperate(type){
    const { value } = this.state;
    const preValue = value;
    let nextValue;
    switch(type){
      case "down":
        this.setState({value: preValue-1});
        nextValue = preValue-1;   
        break;
      case "up":
        this.setState({value: preValue+1});
        nextValue = preValue+1;
        break;
      default:
        break;    
    }
    this.props.onChange(nextValue)
  }
  isValid() {
    return this.state.value !== '' && !isNaN(Number(this.state.value));
  }

  minDisabled() {   
    return  !this.isValid() || (this.state.value <= this.props.min);
  }

  maxDisabled() {    
    return  !this.isValid() || (this.state.value >= this.props.max);
  }

  onChangeValue = (e) => {
    const inputValue = e.detail.value;
    this.setState({value: inputValue});
  }

  onBlurValue = (e) =>{
    const inputValue = e.detail.value;
    const { max , min } = this.props;
    if(Number(inputValue) < min){
      this.setState({value : min});
    }
    if(Number(inputValue) > max){
      this.setState({value: max})
    }
    this.props.onChange(inputValue);
  }

  render () {
    const { value } = this.state
    const { showNumber, min , max , readOnly, inputWidth} = this.props

    return (<View className="stepper">
      <View 
        className="stepper-handler-down" 
        onClick={()=>{this.onClickOperate('down')}}
        className={classNames({
          ["stepper-handler-down"]: true,
          ["isDisabled"]: this.minDisabled(),
          ['isNone']: value <= min && !showNumber
        })}
      >
        -
      </View>
      <View 
        className={classNames({
          ["stepper-input-warp"]: true,
          ['isNone']: value <= min && !showNumber
        })}
        >
        <Input 
        className='stepper-input-warp-value'
        type='number'
        value={value} 
        disabled={readOnly} 
        onInput={this.onChangeValue}
        onBlur={this.onBlurValue}
        />
      </View>
      <View 
        className={classNames({
          ["stepper-handler-up"]: true,
          ["isDisabled"]: this.maxDisabled()
        })}
        onClick={()=>{this.onClickOperate('up')}}
      >+
      </View>
    </View>)
  }
}

index.defaultProps = {
  max: Infinity,
  min: 1
}
index.propTypes = {
  value: PropTypes.number,
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
}