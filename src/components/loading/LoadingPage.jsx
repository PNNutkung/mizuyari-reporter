import React, { Component } from 'react'
import { Grid, ProgressBar } from 'react-bootstrap'
import './LoadingPage.css'

export default class LoadingPage extends Component {
  render () {
    return (
      <Grid>
        <div id='loading-page'>
          <ProgressBar active now={100} />
        </div>
      </Grid>
    )
  }
}
