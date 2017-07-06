import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { dbRef } from '../../config/firebase'

export default class CheckInPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lastDate: null
    }
    this.checkInHandler = this.checkInHandler.bind(this)
    this.getTodayCheckins = this.getTodayCheckins.bind(this)
  }

  componentDidMount () {
    this.getTodayCheckins()
  }

  getTodayCheckins () {
    dbRef.child('checkins')
    .orderByChild('date')
    .limitToLast(1)
    .on('value', snapshot => {
      this.setState({
        lastDate: Object.values(snapshot.val())[0].date
      })
    })
  }

  checkInHandler () {
    dbRef.child('checkins')
    .push({
      name: `${this.props.userInfo.lastname} ${this.props.userInfo.firstname}`,
      date: Date.now()
    })
  }

  render () {
    let lastDate = new Date(this.state.lastDate)
    let alreadyWaterThePlant = (
      lastDate.getFullYear() === (new Date()).getFullYear()
      && lastDate.getMonth() === (new Date()).getMonth()
      && lastDate.getDate() === (new Date()).getDate()
    )
    return (
      <div className='check-in-page'>
        <p>Hello {this.props.userInfo.lastname} {this.props.userInfo.firstname} sama.</p>
        <Button
          bsStyle='primary'
          disabled={!this.props.userInfo || alreadyWaterThePlant }
          block
          onClick={this.checkInHandler}
        >
          {this.props.userInfo? 'Check-in': 'Loading...'}
        </Button>
      </div>
    )
  }
}
