import React, { Component } from 'react'
import HeaderAppBar from '../appbar/HeaderAppBar'

class MenuPage extends Component {
  render() {
    return (
      <div classID='menu-page'>
        <HeaderAppBar authed={this.props.authed} />
        <h1>Hello World!</h1>
      </div>
    )
  }
}

export default MenuPage
