import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { dbRef } from '../../config/firebase'

export default class CheckInPage extends Component {
  constructor (props) {
    super(props)
    this.checkInHandler = this.checkInHandler.bind(this)
  }

  checkInHandler () {
    let currentDate = (new Date()).getTime()
    dbRef.child('checkins')
    .push({
      name: `${this.props.userInfo.lastname} ${this.props.userInfo.firstname}`,
      date: currentDate
    })
  }

  render () {
    return (
      <div className='check-in-page'>
        <p>Hello {this.props.userInfo.lastname} {this.props.userInfo.firstname} sama.</p>
        <Button
          bsStyle='primary'
          disabled={!this.props.userInfo}
          block
          onClick={this.checkInHandler}
        >
          {this.props.userInfo? 'Check-in': 'Loading...'}
        </Button>
      </div>
    )
  }
}
