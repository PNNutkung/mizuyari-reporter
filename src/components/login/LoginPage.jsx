import React, { Component } from 'react'
import LoginInputs from './LoginInputs'

class LoginPage extends Component {
  render() {
    return (
      <div id='login-page' className='mdl-cell mdl-cell--12-col-desktop mdl-cell mdl-cell--12-col-tablet mdl-cell mdl-cell--12-col-phone'>
        <LoginInputs />
      </div>
    )
  }
}

export default LoginPage
