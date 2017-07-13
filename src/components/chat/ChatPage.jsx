import React, { Component } from 'react'
import { Row, Button, FormControl, Col, Glyphicon, ListGroupItem, ListGroup } from 'react-bootstrap'
import './ChatPage.css'
import generator from 'generate-password'
import { dbRef } from '../../config/firebase'

export default class ChatPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chatList: [],
      message: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  sendText = (event) => {
    event.preventDefault()
    dbRef.child('chats')
    .push({
      name: `${this.props.userInfo.lastname} ${this.props.userInfo.firstname}`,
      date: Date.now(),
      message: this.state.message
    })
    this.setState({
      message: ''
    })
  }

  fetchChatData = () => {
    dbRef.child('chats')
    .orderByChild('date')
    .limitToLast(10)
    .on('value', snapshot => {
        if(snapshot.val()) {
          let newChatList = []
          Object.entries(snapshot.val()).forEach(([key, value]) => {
            newChatList.push(
              <ListGroupItem key={generator.generate({
                length: 32,
                numbers: true,
                symbols: true,
                excludeSimilarCharacters: true
              })}>
                <span className='chat-box-name'>{value.name}:</span><br/>
                <span className='chat-box-time'>{(new Date(value.date)).toLocaleTimeString()} {(new Date(value.date)).toLocaleDateString()}</span><br/>
                {value.message}
              </ListGroupItem>
            )
        })
        this.setState({
          chatList: newChatList
        })
       }
    })
  }

  updateScroll = () => {
    let element = document.getElementById('chatList')
    element.scrollTop = element.scrollHeight
  }

  componentWillMount () {
    this.fetchChatData()
  }

  componentDidUpdate () {
    this.updateScroll()
  }

  render () {
    return (
      <div id="chat-page">
        <div className="scroll" id='chatList'>
          <ListGroup>
            {this.state.chatList}
          </ListGroup>
        </div>
        <form onSubmit={this.sendText}>
          <Row>
            <Col xs={8} sm={10} md={10} lg={10}>
              <FormControl
                name='message'
                type='text'
                value={this.state.message}
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
