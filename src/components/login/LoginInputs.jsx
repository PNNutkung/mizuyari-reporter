import React, { Component } from 'react'
import { login, resetPassword } from '../../helpers/auth'
import AnotherMethod from './AnotherMethod'
import { FormGroup, Button, Panel } from 'react-bootstrap'
import FieldGroup from '../FieldGroup'

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
      loginMessage: null
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
        this.setState(setErrorMsg('Wrong username or password.'))
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
        {
          this.state.loginMessage
          ? (<Panel header='Please check' bsStyle='danger'>
              {this.state.loginMessage}
            </Panel>)
          : null
        }
        <div>
          <div>
            <h2>Log in to Mizuyari</h2>
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
                bsStyle='primary'
                type='submit'
                disabled={this.state.isLoggingIn}
                onClick={this.loginHandle}
                block
              >
                {this.state.isLoggingIn ? 'Loging in...': 'Log in'}
              </Button>
              <Button
                disabled={this.state.isResettingPassword}
                onClick={this.forgotPassword}
                block
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
