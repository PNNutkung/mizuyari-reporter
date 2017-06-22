import React, { Component } from 'react'
import HeaderAppBar from '../appbar/HeaderAppBar'

export default class DescriptionPage extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <HeaderAppBar {...this.props}/>
        DescriptionPage
        <br/>
      </div>
    )
  }
}
