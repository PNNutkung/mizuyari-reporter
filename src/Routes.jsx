import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom'
import { dbRef, firebaseAuth } from './config/firebase'
import DescriptionPage from './components/description/DescriptionPage'
import MenuPage from './components/menu/MenuPage'
import LoginPage from './components/login/LoginPage'
import RegisterPage from './components/register/RegisterPage'
import createBrowserHistory from 'history/createBrowserHistory'
import CheckInPage from './components/checkin/CheckInPage'
import WateringLogsPage from './components/watering/WateringLogsPage'
import WeatherForecastPage from './components/weather/WeatherForecastPage'
import ChatPage from './components/chat/ChatPage'
import NotFoundPage from './components/notfound/NotFoundPage'
import LoadingPage from './components/loading/LoadingPage'
import { logout } from './helpers/auth'
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const mizuHistory = createBrowserHistory()

const PrivateRoute = ({component: Component, authed, userInfo, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => (authed === true
        ? (<Component authed={authed} userInfo={userInfo} {...props} />)
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
      loading: true,
      userInfo: ''
    }
    this.getUserInfo = this.getUserInfo.bind(this)
  }

  getUserInfo () {
    dbRef.child(`users/${firebaseAuth().currentUser.uid}`)
    .on('value', snapshot => {
      this.setState({userInfo: snapshot.val().info})
    })
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.getUserInfo()
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

  logoutHandler () {
    logout()
    return <Redirect push to='/'/>
  }

  render() {
    return this.state.loading === true ? <LoadingPage /> : (
      <Router history={mizuHistory}>
        <div>
          <Navbar collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to='/menu'>水やりリポーター</Link>
              </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                {
                  this.state.authed
                  ? ([
                      <LinkContainer to='/weather' key={2}><NavItem eventKey={2}>Weather Forecast</NavItem></LinkContainer>,
                      <LinkContainer to='/checkin' key={1}><NavItem eventKey={1}>Check in</NavItem></LinkContainer>,
                      <LinkContainer to='/chat' key={3}><NavItem eventKey={3}>Watering Logs</NavItem></LinkContainer>,
                      <LinkContainer to='/logs' key={4}><NavItem eventKey={4}>Chat</NavItem></LinkContainer>,
                      <NavItem eventKey={5} key={5} onClick={this.logoutHandler}>Log Out</NavItem>
                    ])
                  : ([
                      <LinkContainer to='/login' key={6}><NavItem eventKey={6}>Log in</NavItem></LinkContainer>,
                      <LinkContainer to='/signup'key={7}><NavItem eventKey={7}>Sign up</NavItem></LinkContainer>
                    ])
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Grid>
              <Switch>
                  <Route path='/' exact render={props => <DescriptionPage authed={this.state.authed} {...props} />} />
                  <PublicRoute authed={this.state.authed} path='/login' component={LoginPage} />
                  <PublicRoute authed={this.state.authed} path='/signup' component={RegisterPage} />
                  <PrivateRoute authed={this.state.authed} userInfo={this.state.userInfo} path='/menu' component={MenuPage} />
                  <PrivateRoute authed={this.state.authed} userInfo={this.state.userInfo} path='/checkin' component={CheckInPage} />
                  <PrivateRoute authed={this.state.authed} userInfo={this.state.userInfo} path='/logs' component={WateringLogsPage} />
                  <PrivateRoute authed={this.state.authed} userInfo={this.state.userInfo} path='/weather' component={WeatherForecastPage} />
                  <PrivateRoute authed={this.state.authed} userInfo={this.state.userInfo} path='/chat' component={ChatPage} />
                  <Route render={() => <NotFoundPage />} />
              </Switch>
          </Grid>
        </div>
      </Router>
    )
  }
}
