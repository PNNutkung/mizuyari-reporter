import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { dbRef } from '../../config/firebase'

export default class CheckInPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lastDate: null,
      who: '',
      period: ''
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
        who: Object.values(snapshot.val())[0].name,
        period: Object.values(snapshot.val())[0].period
      })
      : this.setState({
        lastDate: null,
        who: '',
        period: ''
      })
    })
  }

  checkInHandler () {
    dbRef.child('checkins')
    .push({
      name: `${this.props.userInfo.lastname} ${this.props.userInfo.firstname}`,
      date: Date.now(),
      period: ((new Date()).getHours() <= 12) ? 'morning' : 'evening'
    })
  }

  render () {
    let lastDate = new Date(this.state.lastDate)
    const current = new Date()
    let alreadyWaterThePlant = (
      lastDate.getFullYear() === current.getFullYear()
      && lastDate.getMonth() === current.getMonth()
      && lastDate.getDate() === current.getDate()
      && this.state.period === ((current.getHours() < 12) ? 'morning' : 'evening')
    )
    return (
      <div className='check-in-page'>
        <h2>Welcome, {this.props.userInfo.lastname} {this.props.userInfo.firstname} 様.</h2>
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
          {this.props.userInfo? `Check-in ${(((new Date()).getHours() < 12) ? 'morning' : 'evening')}`: 'Loading...'}
        </Button>
      </div>
    )
  }
}
