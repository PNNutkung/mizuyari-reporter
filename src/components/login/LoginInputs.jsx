import React, { Component } from 'react'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import {grey500} from 'material-ui/styles/colors'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import RegisterPart from './RegisterPart'
import './logininputs.css'

const iconStyles = {
  width: '100%',
  height: 'auto'
}

export default class LoginInputs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  loginHandle = (event) => {
    console.log(this.state)
  }

  render() {
    return (
      <div id='login-inputs-section'>
        <Card>
          <CardTitle title="Log in to Mizuyari" />
          <div id='account-icon'>
            <AccountCircle style={iconStyles} color={grey500} />
          </div>
          <CardText>
            <TextField floatingLabelText='Username' name='username' type='text' value={this.state.username} onChange={this.handleChange} fullWidth={true} />
            <TextField floatingLabelText='Password' name='password' type='password' value={this.state.password} onChange={this.handleChange} fullWidth={true} />
          </CardText>
          <CardActions>
            <RaisedButton label="Log in" className='login-input-btn' fullWidth={true} onClick={this.loginHandle} primary={true} />
          </CardActions>
        </Card>
        <RegisterPart />
      </div>
    )
  }
}
