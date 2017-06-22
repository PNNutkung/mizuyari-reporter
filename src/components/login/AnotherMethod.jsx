import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

export default class AnotherMethod extends Component {
  render() {
    return (
      <div>
        <RaisedButton label="Sign up" className='login-inputs-btn' fullWidth={true} href="/signup" />
      </div>
    )
  }
}
