import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class AnotherMethod extends Component {
  render() {
    return (
      <div>
        <Link to='/signup'>
          <Button block>
            Sign up
          </Button>
        </Link>
      </div>
    )
  }
}
