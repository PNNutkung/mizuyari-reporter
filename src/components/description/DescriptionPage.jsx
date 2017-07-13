import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Jumbotron, Button } from 'react-bootstrap'

export default class DescriptionPage extends Component {
  render() {
    return (
      <Jumbotron>
        <h1>Mizuyari reporter</h1>
        <p>
          Shin has to operate his backbone. He cannot watering the plants by himself. This application will help Shin to know his plants are watered by his friends.
        </p>
        <p>
          <Link to='/menu'>
            <Button bsStyle='primary'>Let's start!</Button>
          </Link>
        </p>
      </Jumbotron>
    )
  }
}
