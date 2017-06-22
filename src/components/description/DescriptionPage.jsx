import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class DescriptionPage extends Component {
  render() {
    return (
      <div>
        DescriptionPage
        <Link to='/login'>login</Link>
        <br/>
      </div>
    )
  }
}
