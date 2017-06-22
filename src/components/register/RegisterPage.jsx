import React, { Component } from 'react'
import { auth } from '../../helpers/auth'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Redirect } from 'react-router'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'

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
      return <Redirect push to="/"/>
    })
    .catch(err => this.setState(setErrorMsg(err)))
  }

  render() {
    return (
      <div classID='register-page'>
        <form classID='sign-up-form' onSubmit={this.onSignUpSubmit}>
          <Card>
            <CardTitle title="Sign up to Mizuyari" />
            <CardText>
              <TextField floatingLabelText="Email" name='username' type='text' value={this.state.username} onChange={this.handleChange} fullWidth={true} />
              <TextField floatingLabelText="Password" name='password' type='password' value={this.state.password} onChange={this.handleChange} fullWidth={true} />
              {
                this.state.registerError &&
                <div className="alert alert-danger" role="alert">
                  <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                  <span className="sr-only">Error:</span>
                  &nbsp;{this.state.registerError}
                </div>
              }
            </CardText>
            <CardActions>
              <RaisedButton type="submit" label="Sign up" primary={true} fullWidth={true} />
            </CardActions>
          </Card>
        </form>
      </div>
    )
  }
}
