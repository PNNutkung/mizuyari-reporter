import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'

export default class RegisterPart extends Component {
  render() {
    return (
      <div>
        <RaisedButton label="Sign up" className='login-input-btn' fullWidth={true} onClick={this.loginHandle} />
      </div>
    )
  }
}
