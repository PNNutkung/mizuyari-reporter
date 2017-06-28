import React, { Component } from 'react'
import { firebaseAuth } from '../../config/firebase'

export default class LoginWithFacebook extends Component {
  signInWithFireBase() {
    const provider = new firebaseAuth.FacebookAuthProvider()
    firebaseAuth().signInWithRedirect(provider).then(res => {
      console.log(res)
    }).catch((error) => {
      alert(`Cannot sign in: ${String(error)}`)
    })
  }

  render() {
    return (
      <div classID='login-with-facebook'>
        <button icon='bookmark' label='Login with Facebook' onClick={() => this.signInWithFireBase()} />
      </div>
    )
  }
}
