import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { dbRef } from '../../config/firebase'

export default class CheckInPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lastDate: null,
      who: ''
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
      snapshot.val()
      ? this.setState({
        lastDate: Object.values(snapshot.val())[0].date,
        who: Object.values(snapshot.val())[0].name
      })
      : this.setState({
        lastDate: new Date(1910, 9, 11),
        who: ''
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
        <h1>Hello {this.props.userInfo.lastname} {this.props.userInfo.firstname} sama.</h1>
        {
          (!this.props.userInfo || alreadyWaterThePlant)
          ? ( this.state.who === `${this.props.userInfo.lastname} ${this.props.userInfo.firstname}`
              ? <h3>You have watered the plant today!</h3>
              : <h3>Today, there is somebody watered the plant!</h3>
            )
          : null
        }
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
