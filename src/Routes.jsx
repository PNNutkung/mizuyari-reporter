import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { firebaseAuth } from './config/firebase'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DescriptionPage from './components/description/DescriptionPage'
import MenuPage from './components/menu/MenuPage'
import LoginPage from './components/login/LoginPage'
import RegisterPage from './components/register/RegisterPage'

const PrivateRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => (authed === true
        ? (<Component authed={authed} {...props} />)
        : (<Redirect to={{pathname: '/login', state: {from: props.location}}} />)
      )} />
  )
}

const PublicRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => (authed === false
        ? (<Component authed={authed} {...props} />)
        : (<Redirect to='/menu' />)
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
            <Switch>
              <Route path='/' exact render={props => <DescriptionPage authed={this.state.authed} {...props} />} />
              <PublicRoute authed={this.state.authed} path='/login' component={LoginPage} />
              <PublicRoute authed={this.state.authed} path='/signup' component={RegisterPage} />
              <PrivateRoute authed={this.state.authed} path='/menu' component={MenuPage} />
              <Route render={() => <h3>No Match</h3>} />
            </Switch>
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}
