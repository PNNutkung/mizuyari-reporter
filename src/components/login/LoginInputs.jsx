import React, { Component } from 'react'
import { Input } from 'react-toolbox/lib/input'

class LoginInputs extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value})
  }

  render() {
    return (
      <section>
        <Input type='text' label='Username' name="username" value={this.state.username} onChange={this.handleChange.bind(this, 'username')} maxLength={32} />
        <Input type='password' label='Password' name="password" value={this.state.password} onChange={this.handleChange.bind(this, 'password')} maxLength={32} />
      </section>
    )
  }
}

export default LoginInputs
