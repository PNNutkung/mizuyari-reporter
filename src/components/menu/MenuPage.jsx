import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { storageRef } from '../../config/firebase'


class MenuPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checkinCardImage: '',
      weatherForecastCardImage: '',
      wateringLogsCardImage: ''
    }
    this.getImage('checkinCardImage')
    this.getImage('weatherForecastCardImage')
    this.getImage('wateringLogsCardImage')
  }

  getImage = (image) => {
    storageRef.child(`menu/${image}.jpg`).getDownloadURL().then((url) => {
      this.setState({
        [image]: url
      })
    })
  }

  render() {
    let menuCardCheckinStyle = {
      background: `url(${this.state.checkinCardImage}) center / cover`,
      height: '200px',
      color: '#fff'
    }
    let weatherForecastCardCheckinStyle = {
      background: `url(${this.state.weatherForecastCardImage}) center / cover`,
      height: '200px',
      color: '#fff'
    }
    let wateringLogsCardImageStyle = {
      background: `url(${this.state.wateringLogsCardImage}) center / cover`,
      height: '200px',
      color: '#fff'
    }
    return (
      <div className='mdl-cell mdl-cell--8-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'>
        <Link to='/weather'>
          <div className='mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone' onClick={this.forecastHandler}>
            <div className="mdl-card__title" style={weatherForecastCardCheckinStyle}>
              <h2 className="mdl-card__title-text">Weather Forecast</h2>
            </div>
          </div>
        </Link>
        <Link to='/checkin'>
          <div className='mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone' onClick={this.checkinHandler}>
            <div className="mdl-card__title" style={menuCardCheckinStyle}>
              <h2 className="mdl-card__title-text">Check-in</h2>
            </div>
          </div>
        </Link>
        <Link to='/logs'>
          <div className='mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone' onClick={this.logHandler}>
            <div className="mdl-card__title" style={wateringLogsCardImageStyle}>
              <h2 className="mdl-card__title-text">Watering Logs</h2>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default MenuPage
