import React, { Component } from 'react'
import { auth } from '../../helpers/auth'
import { Redirect } from 'react-router'
import { FormGroup, Button, Panel } from 'react-bootstrap'
import FieldGroup from '../FieldGroup'

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
      registerError: null,
      isRegistering: false
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      registerError: null
    })
  }

  onSignUpSubmit = (event) => {
    event.preventDefault()
    this.setState({isRegistering: true})
    auth(this.state.username, this.state.password)
    .then(() => {
      this.setState({isRegistering: false})
      return <Redirect push to='/'/>
    })
    .catch(err => {
      this.setState({isRegistering: false})
      this.setState(setErrorMsg(err))
    })
  }

  render() {
    return (
      <div id='register-page' className='mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'>
        {
          this.state.registerError 
          ? (<Panel header='Please check' bsStyle='danger'>
            {this.state.registerError}
          </Panel>)
          : null
        }
        <div className='mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone'>
            <div className='mdl-card__title mdl-card--expand'>
              <h2 className="mdl-card__title-text">Sign up to Mizuyari</h2>
            </div>
            <form onSubmit={this.onSignUpSubmit}>
              <FormGroup controlId='registerForm'>
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
                  disabled={this.state.isRegistering}
                  onClick={this.onSignUpSubmit}
                >
                  {this.state.isRegistering ? 'Registering...': 'Register'}
                </Button>
              </FormGroup>
          </form>
        </div>
      </div>
    )
  }
}
