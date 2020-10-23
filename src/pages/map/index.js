import React, { Component } from 'react'
import { View, Map } from '@tarojs/components'
export default class index extends Component {
  state = {
    markers: []
  }

  componentDidMount(){

  }

  onTap = (e) =>{
    this.setState({
      markers: [{  
        latitude: e.detail.latitude,
        longitude: e.detail.longitude,
        id: 0,
        width: 50,
        height: 50
     }]
    })
  }
  render() {
    const { markers } = this.state
    console.log(markers)

    return (
      <View>
         <Map markers={markers} style={{height:'400px', width:'99%'}} onClick={this.onTap} longitude="120.13026" latitude="30.25961" scale="14"/> 
      </View>
    )
  }
}
