import React, { Component } from 'react'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { grey500 } from 'material-ui/styles/colors'
import { login, resetPassword } from '../../helpers/auth'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import AnotherMethod from './AnotherMethod'
import FlatButton from 'material-ui/FlatButton'
import './logininputs.css'

const iconStyles = {
  width: '100%',
  height: 'auto'
}

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
        this.setState(setErrorMsg('Wrong username or password.'))
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
        <form onSubmit={this.loginHandle}>
          <Card>
            <CardTitle title="Log in to Mizuyari" />
            <div id='account-icon'>
              <AccountCircle style={iconStyles} color={grey500} />
            </div>
            <CardText>
              <TextField floatingLabelText='Email' name='username' type='text' value={this.state.username} onChange={this.handleChange} fullWidth={true} />
              <TextField floatingLabelText='Password' name='password' type='password' value={this.state.password} onChange={this.handleChange} fullWidth={true} />
            </CardText>
            <CardActions className='login-inputs-card-action'>
              <RaisedButton type='submit' label='Log in' className='login-inputs-btn' fullWidth={true} primary={true} />
              <FlatButton label='Forgot password?' className='login-inputs-btn' fullWidth={true} onTouchTap={this.forgotPassword} />
            </CardActions>
          </Card>
        </form>
        <h3>Or</h3>
        <AnotherMethod />
      </div>
    )
  }
}
