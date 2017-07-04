import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom'
import { firebaseAuth } from './config/firebase'
import DescriptionPage from './components/description/DescriptionPage'
import MenuPage from './components/menu/MenuPage'
import LoginPage from './components/login/LoginPage'
import RegisterPage from './components/register/RegisterPage'
import createBrowserHistory from 'history/createBrowserHistory'
import CheckInPage from './components/checkin/CheckInPage'
import { logout } from './helpers/auth'
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap'

const mizuHistory = createBrowserHistory()

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

  handleTitleTouchTap = () => {
    window.location = '/menu'
  }

  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
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
                      <NavItem eventKey={0}><Link to='/menu'>Menu</Link></NavItem>,
                      <NavItem eventKey={1}><Link to='/checkin'>Check in</Link></NavItem>,
                      <NavItem eventKey={2}><Link to='/weather'>Weather Forecast</Link></NavItem>,
                      <NavItem eventKey={3}><Link to='/logs'>Watering Logs</Link></NavItem>,
                      <NavItem eventKey={4}><Link to='/' onClick={ () => { logout() } }>Log Out</Link></NavItem>
                  ])
                  : (<NavItem eventKey={5}><Link to='/login'>Log in</Link></NavItem>)
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Grid>
              <Switch>
                  <Route path='/' exact render={props => <DescriptionPage authed={this.state.authed} {...props} />} />
                  <PublicRoute authed={this.state.authed} path='/login' component={LoginPage} />
                  <PublicRoute authed={this.state.authed} path='/signup' component={RegisterPage} />
                  <PrivateRoute authed={this.state.authed} path='/menu' component={MenuPage} />
                  <PrivateRoute authed={this.state.authed} path='/checkin' component={CheckInPage} />
                  <Route render={() => <h3>No Match</h3>} />
              </Switch>
          </Grid>
        </div>
      </Router>
    )
  }
}
