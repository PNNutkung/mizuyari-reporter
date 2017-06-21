import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import createBrowserHistory from 'history/createBrowserHistory'
import MenuPage from './components/menu/MenuPage'
import LoginPage from './components/login/LoginPage'
import RegisterPage from './components/register/RegisterPage'

export default class Routes extends Component {
  render() {
    const appHistory = createBrowserHistory()
    return (
      <MuiThemeProvider>
        <Router history={appHistory}>
          <div classID='application'>
            <Route exact path='/' component={MenuPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/signup' component={RegisterPage} />
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}
