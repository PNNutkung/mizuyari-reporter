import React, { Component } from 'react'
import { storageRef } from '../../config/firebase'

// const cardMenuCheckInStyle = {
//   background: `url(${storageRef.child('menu/checkin-card-image.jpg').getDownloadURL()}) center / cover`
// }

class MenuPage extends Component {
  checkinHandler = () => {
    console.log(storageRef.child('menu/checkin-card-image.jpg').getDownloadURL())
    console.log('Check in click')
  }

  render() {
    return (
      <div>
        <div className='mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'>
          <div className='mdl-card mdl-shadow--2dp' onClick={this.checkinHandler}>
            <div className='mdl-card__title mdl-card--expand'></div>
            <div className='mdl-card__actions'>
              <span className='demo-card-image__filename'>Check-in</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MenuPage
