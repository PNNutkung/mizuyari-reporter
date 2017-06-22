import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom'
import { firebaseAuth } from './config/firebase'
import { logout } from './helpers/auth'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DescriptionPage from './components/description/DescriptionPage'
import MenuPage from './components/menu/MenuPage'
import LoginPage from './components/login/LoginPage'
import RegisterPage from './components/register/RegisterPage'

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={props => (authed === true
        ? (<Component authed={authed} {...props} />)
        : (<Redirect to={{pathname: '/login', state: {from: props.location}}} />)
      )} />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={props => (authed === false
        ? (<Component authed={authed} {...props} />)
        : (<Redirect to='/main' />)
    )} />
  )
}

export default class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authed: false,
      loading: true
    }
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }

  componentWillUnmount () {
    this.removeListener()
  }

  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <Router>
        <MuiThemeProvider>
          <div classID='application'>
            <div>
              <li>
          {this.state.authed
                    ? <button
                        style={{border: 'none', background: 'transparent'}}
                        onClick={() => {
                          logout()
                        }}
                        className="navbar-brand">Logout</button>
                    : <span>
                        <Link to="/login" className="navbar-brand">Login</Link><br/>
                        <Link to="/signup" className="navbar-brand">signup</Link>
                      </span>}
        </li>
            </div>
            <Switch>
              <Route path='/' exact component={DescriptionPage} />
              <PublicRoute authed={this.state.authed} path='/login' component={LoginPage} />
              <PublicRoute authed={this.state.authed} path='/signup' component={RegisterPage} />
              <PrivateRoute authed={this.state.authed} path='/main' component={MenuPage} />
              <Route render={() => <h3>No Match</h3>} />
            </Switch>
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}
