import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { storageRef } from '../../config/firebase'
import WeatherForecastComponent from './WeatherForecastComponent'
import './MenuPage.css'

class MenuPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checkinCardImage: '',
      wateringLogsCardImage: ''
    }
    this.getImage('checkinCardImage')
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
    let style = {
      color: 'inherit',
      textDecoration: 'none'
    }
    let cardLink = {
      textDecoration: 'none'
    }
    let menuCardCheckinStyle = {
      background: `url(${this.state.checkinCardImage}) center / cover`,
      width: '100%',
      height: '200px',
      color: '#fff',
      textDecoration: 'none'
    }
    let wateringLogsCardImageStyle = {
      background: `url(${this.state.wateringLogsCardImage}) center / cover`,
      height: '200px',
      color: '#fff',
      textDecoration: 'none'
    }
    return (
      <div id='menu-page'>
        <Link to='/weather' style={style}>
          <WeatherForecastComponent />
        </Link>
        <Link to='/checkin' style={cardLink}>
          <div className='card-menu-page' onClick={this.checkinHandler}>
            <div className='card-detail' style={menuCardCheckinStyle}>
              <h2 className='card-title'>Check-in</h2>
            </div>
          </div>
        </Link>
        <Link to='/logs' style={cardLink}>
          <div className='card-menu-page' onClick={this.logHandler}>
            <div className='card-detail' style={wateringLogsCardImageStyle}>
              <h2 className='card-title'>Watering Logs</h2>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default MenuPage
