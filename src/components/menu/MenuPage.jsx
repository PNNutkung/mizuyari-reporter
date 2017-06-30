import React, { Component } from 'react'
import { storageRef } from '../../config/firebase'


class MenuPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checkinCardImage: ''
    }
    this.getImage('checkinCardImage')
  }

  checkinHandler = () => {
    console.log('Check in click')
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
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${this.state.checkinCardImage})`,
      height: '240px'
    }
    return (
      <div className='mdl-cell mdl-cell--8-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'>
        <div className='mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone' onClick={this.checkinHandler}>
          <div id='check-in-card' className='mdl-card__title mdl-card--expand' style={menuCardCheckinStyle}></div>
          <div className='mdl-card__actions'>
            <span className='demo-card-image__filename'>Check-in</span>
          </div>
        </div>
      </div>
    )
  }
}

export default MenuPage
