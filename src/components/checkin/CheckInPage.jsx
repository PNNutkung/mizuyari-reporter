import React, { Component } from 'react'

export default class CheckInPage extends Component {
  render () {
    return (
      <div className='check-in-page'>
        Hello CheckInPage
        <p>{this.props.userInfo.firstname}</p>
      </div>
    )
  }
}
