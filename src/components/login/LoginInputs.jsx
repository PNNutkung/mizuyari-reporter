import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import './logininputs.css'

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
          <TextField floatingLabelText='Username' name='username' type='text' value={this.state.username} onChange={this.handleChange} fullWidth={true} />
          <TextField floatingLabelText='Password' name='password' type='password' value={this.state.password} onChange={this.handleChange} fullWidth={true} />
          <RaisedButton label="Login" fullWidth={true} onClick={this.loginHandle}/>
      </div>
    )
  }
}
