import React, { Component } from 'react'
import { login, resetPassword } from '../../helpers/auth'
import AnotherMethod from './AnotherMethod'

function setErrorMsg (err) {
  return {
    loginMessage: err
  }
}

export default class LoginInputs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      loginMessage: null
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  loginHandle = (event) => {
    event.preventDefault()
    login(this.state.username, this.state.password)
      .catch((err) => {
        let snackbarContainer = document.querySelector('#login-toast')
        this.setState(setErrorMsg('Wrong username or password.'))
        snackbarContainer.MaterialSnackbar.showSnackbar({message: this.state.loginMessage})
      })
  }

  forgotPassword = () => {
    resetPassword(this.state.username)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.state.username}`)))
      .catch((err) => this.setState(setErrorMsg(`Email address not found.`)))
  }

  render() {
    return (
      <div id='login-inputs-section'>
        <div className='mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'>
          <div className='mdl-card__title mdl-card--expand'>
            <h2 className='mdl-card__title-text'>Log in to Mizuyari</h2>
          </div>
          <form onSubmit={this.loginHandle}>
            <div className='mdl-card__supporting-text mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'>
              <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'>
                <input className='mdl-textfield__input' id='login-inputs-username' name='username' type='text' value={this.state.username} onChange={this.handleChange} />
                <label className='mdl-textfield__label' htmlFor='login-inputs-username'>Email</label>
              </div>
              <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'>
                <input className='mdl-textfield__input' id='login-inputs-password' name='password' type='password' value={this.state.password} onChange={this.handleChange} />
                <label className='mdl-textfield__label' htmlFor='login-inputs-password'>Password</label>
              </div>
              <div id='login-toast' className='mdl-js-snackbar mdl-snackbar mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'>
              <div className='mdl-snackbar__text mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'></div>
                <button className='mdl-snackbar__action' type='button'></button>
              </div>
            </div>
            <div className='mdl-card__actions mdl-card--border'>
              <button className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored  mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone' type='submit'>
                Log in
              </button>
              <button className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone' onClick={this.forgotPassword}>
                Reset password?
              </button>
            </div>
          </form>
        </div>
        <h3>Or</h3>
        <AnotherMethod />
      </div>
    )
  }
}
