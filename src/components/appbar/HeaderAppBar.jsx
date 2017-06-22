import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { logout } from '../../helpers/auth'

export default class HeaderAppBar extends Component {
  handleTitleTouchTap = () => {
    this.props.history.push('/')
  }

  render() {
    console.log(this.props)
    return (
      <AppBar
        title='水やりリポーター'
        onTitleTouchTap={this.handleTitleTouchTap}
        iconElementRight={
          this.props.authed
          ? <FlatButton onClick={ () => { logout() } } label='Log Out' />
          : <div>
              <FlatButton label='Log in' href='/login' />
              <FlatButton label='Sign up' href='/signup' />
            </div>
        }
      />
    )
  }
}
