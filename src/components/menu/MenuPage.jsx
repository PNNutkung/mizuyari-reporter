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
      background: `url(${this.state.checkinCardImage}) center / cover`,
      height: '200px',
      color: '#fff'
    }
    return (
      <div className='mdl-cell mdl-cell--8-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'>
        <div className='mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone' onClick={this.checkinHandler}>
          <div className="mdl-card__title" style={menuCardCheckinStyle}>
            <h2 className="mdl-card__title-text">Check-in</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default MenuPage
