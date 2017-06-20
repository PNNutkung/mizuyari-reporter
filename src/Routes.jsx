import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MenuPage from './components/menu/MenuPage'
import LoginPage from './components/login/LoginPage'

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <div classID='application'>
          <Route exact path='/' component={MenuPage} />
          <Route path='/login' component={LoginPage} />
        </div>
      </Router>
    )
  }
}
