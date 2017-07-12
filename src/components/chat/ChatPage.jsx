import React, { Component } from 'react'
import { Row, Button, FormControl, Col, Glyphicon, ListGroupItem, ListGroup } from 'react-bootstrap'
import './ChatPage.css'
import generator from 'generate-password'

export default class ChatPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chatList: [],
      sendText: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  sendText = (event) => {
    let newChatList = this.state.chatList.slice()
    newChatList.push(
        <ListGroupItem key={generator.generate({
          length: 32,
          numbers: true,
          symbols: true,
          excludeSimilarCharacters: true
        })}>
          {this.props.userInfo.lastname} {this.props.userInfo.firstname}<br/>
          {this.state.sendText}
        </ListGroupItem>
      )
    this.setState({
      chatList: newChatList,
      sendText: ''
    })
  }

  render () {
    return (
      <div id="chat-page">
        <div className="scroll">
          <ListGroup>
            {this.state.chatList}
          </ListGroup>
        </div>
        <form>
          <Row>
            <Col xs={8} sm={10} md={10} lg={10}>
              <FormControl
                name='sendText'
                type='text'
                value={this.state.sendText}
                placeholder='Type a message...'
                onChange={this.handleChange}
              />
            </Col>
            <Col xs={4} sm={2} md={2} lg={2}>
              <Button
                bsStyle='primary'
                onClick={this.sendText}
                block
              >
                <Glyphicon glyph='send' />
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    )
  }
}
