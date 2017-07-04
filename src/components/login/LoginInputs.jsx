import React, { Component } from 'react'
import { login, resetPassword } from '../../helpers/auth'
import AnotherMethod from './AnotherMethod'
import { FormGroup, Button } from 'react-bootstrap'
import FieldGroup from './FieldGroup'

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
      loginMessage: null,
      isLoggingIn: false,
      isResettingPassword: false
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  loginHandle = (event) => {
    event.preventDefault()
    this.setState({
      isLoggingIn: true
    })
    login(this.state.username, this.state.password)
      .then(() => this.setState({isLoggingIn: false}))
      .catch((err) => {
        this.setState({isLoggingIn: false})
        
      })
  }

  forgotPassword = () => {
    this.setState({isResettingPassword: true})
    resetPassword(this.state.username)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.state.username}`,{isResettingPassword: false})))
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
            <FormGroup controlId='loginForm'>
              <FieldGroup
                id='username'
                name='username'
                type='text'
                label='Email'
                placeholder='Please enter your email'
                value={this.state.username}
                onChange={this.handleChange}
              />
              <FieldGroup
                id='password'
                name='password'
                type='password'
                label='Password'
                placeholder='Please enter your password'
                value={this.state.password}
                onChange={this.handleChange}
              />
              <Button 
                bsStyle="primary"
                disable={this.state.isLoggingIn}
              >
                {this.state.isLoggingIn ? 'Loging in...': 'Log in'}
              </Button>
              <Button
                type='submit'
                disable={this.state.isResettingPassword}
                onClick={this.forgotPassword}
              >
                {this.state.isResettingPassword? 'Resetting password': 'Reset password'}
              </Button>
            </FormGroup>
          </form>
        </div>
        <h3>Or</h3>
        <AnotherMethod />
      </div>
    )
  }
}
