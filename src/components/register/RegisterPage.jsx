import React, { Component } from 'react'
import { auth } from '../../helpers/auth'
import { Redirect } from 'react-router'

function setErrorMsg(err) {
  return {
    registerError: err.message
  }
}

export default class RegisterPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      registerError: null
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSignUpSubmit = (event) => {
    event.preventDefault()
    auth(this.state.username, this.state.password)
    .then(() => {
      return <Redirect push to='/'/>
    })
    .catch(err => {
      let snackbarContainer = document.querySelector('#register-toast')
      this.setState(setErrorMsg(err))
      snackbarContainer.MaterialSnackbar.showSnackbar({message: this.state.registerError})
    })
  }

  render() {
    return (
      <div id='register-page' className='mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'>
        <div className='mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'>
            <div className='mdl-card__title mdl-card--expand'>
              <h2 className="mdl-card__title-text">Sign up to Mizuyari</h2>
            </div>
            <form onSubmit={this.onSignUpSubmit}>
              <div className='mdl-card__supporting-text mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'>
                <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'>
                  <input className='mdl-textfield__input' id='register-inputs-username' name='username' type='text' value={this.state.username} onChange={this.handleChange} />
                  <label className='mdl-textfield__label' htmlFor='register-inputs-username'>Email</label>
              </div>
              <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'>
                <input className='mdl-textfield__input' id='register-inputs-password' name='password' type='password' value={this.state.password} onChange={this.handleChange} />
                <label className='mdl-textfield__label' htmlFor='register-inputs-password'>Password</label>
              </div>
              <div id='register-toast' className='mdl-js-snackbar mdl-snackbar mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'>
              <div className='mdl-snackbar__text mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'></div>
                <button className='mdl-snackbar__action' type='button'></button>
              </div>
            </div>
            <div className='mdl-card__actions mdl-card--border '>
              <button className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone' type='submit'>Sign up</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
