import React, { Component } from 'react'
import { auth } from '../../helpers/auth'
import { Redirect } from 'react-router'
import { FormGroup, Button, Panel } from 'react-bootstrap'
import FieldGroup from '../FieldGroup'
import { dbRef } from '../../config/firebase'

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
      firstname: '',
      lastname: '',
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
    .then((user) => {
      this.setState({isRegistering: false})
      dbRef.child(`users/${user.uid}`)
      .set({
        info: {
          uid: user.uid,
          email: user.email,
          firstname: this.state.firstname,
          lastname: this.state.lastname
        }
      })
      return <Redirect push to='/'/>
    })
    .catch(err => {
      this.setState({isRegistering: false})
      this.setState(setErrorMsg(err))
    })
  }

  render() {
    return (
      <div id='register-page'>
        {
          this.state.registerError 
          ? (<Panel header='Please check' bsStyle='danger'>
            {this.state.registerError}
          </Panel>)
          : null
        }
        <div>
            <div>
              <h2>Sign up to Mizuyari</h2>
            </div>
            <form onSubmit={this.onSignUpSubmit}>
              <FormGroup controlId='registerForm'>
                <FieldGroup
                  id='username'
                  name='username'
                  type='text'
                  label='Email'
                  placeholder='Please enter your email.'
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <FieldGroup
                  id='password'
                  name='password'
                  type='password'
                  label='Password'
                  placeholder='Please enter your password.'
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <FieldGroup
                  id='firstname'
                  name='firstname'
                  type='text'
                  label='Firstname'
                  placeholder='Please enter your firstname.'
                  value={this.state.firstname}
                  onChange={this.handleChange}
                />
                <FieldGroup
                  id='lastname'
                  name='lastname'
                  type='text'
                  label='Lastname'
                  placeholder='Please enter your lastname.'
                  value={this.state.lastname}
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
