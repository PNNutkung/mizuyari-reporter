import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

export default class FieldGroup extends Component {
  render () {
    return (
      <FormGroup>
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl {...this.props} />
        {}
      </FormGroup>
    )
  }
}
