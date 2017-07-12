import React, { Component } from 'react'
import { Row, Button, FormControl, Col } from 'react-bootstrap'

export default class ChatPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sendText: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    return (
      <div id="chat-page">
        Hello Chat Page
       <Row>
         <Col sm={10} md={10} lg={10}>
          <FormControl
            name='sendText'
            type='text'
            value={this.state.sendText}
            placeholder='Type a message...'
            onChange={this.handleChange}
          />
         </Col>
         <Col sm={2} md={2} lg={2}>
          <Button
            bsStyle='primary'
            onClick={this.onClick}
          >
            <i className='material-icons'>send</i>
          </Button>
         </Col>
       </Row>
      </div>
    )
  }
}
