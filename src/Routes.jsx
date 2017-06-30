import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { firebaseAuth } from './config/firebase'
import DescriptionPage from './components/description/DescriptionPage'
import MenuPage from './components/menu/MenuPage'
import LoginPage from './components/login/LoginPage'
import RegisterPage from './components/register/RegisterPage'
import createBrowserHistory from 'history/createBrowserHistory'
import CheckInPage from './components/checkin/CheckInPage'
import { logout } from './helpers/auth'

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
        <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
          <header className='mdl-layout__header'>
            <div className='mdl-layout__header-row'>
              <span className='mdl-layout-title' onClick={this.handleTitleTouchTap}>水やりリポーター</span>
              <div className='mdl-layout-spacer'></div>
              <nav className='mdl-navigation mdl-layout--large-screen-only'>
                {
                  this.state.authed
                  ? ([<a className='mdl-navigation__link' href='/menu'>Menu</a>,
                    <a className='mdl-navigation__link' href='/checkin'>Check in</a>,
                    <a className='mdl-navigation__link' href='/weather'>Weather Forecast</a>,
                    <a className='mdl-navigation__link' href='/logs'>Watering Logs</a>,
                    <a className='mdl-navigation__link' onClick={ () => { logout() } }>Log Out</a>
                  ])
                  : (<a className='mdl-navigation__link' href='/login'>Log in</a>)
                }
              </nav>
            </div>
          </header>
          <div className="mdl-layout__drawer">
            <span className="mdl-layout-title">水やりリポーター</span>
            <nav className="mdl-navigation">
              {
                this.state.authed
                ? ([<a className='mdl-navigation__link' href='/menu'>Menu</a>,
                    <a className='mdl-navigation__link' href='/checkin'>Check in</a>,
                    <a className='mdl-navigation__link' href='/weather'>Weather Forecast</a>,
                    <a className='mdl-navigation__link' href='/logs'>Watering Logs</a>,
                    <a className='mdl-navigation__link' onClick={ () => { logout() } }>Log Out</a>
                ])
                : (<a className='mdl-navigation__link' href='/login'>Log in</a>)
              }
            </nav>
          </div>
          <main className='mdl-layout__content'>
            <div className='page-content mdl-grid'>
              <div className="mdl-layout-spacer"></div>
                <Switch className='mdl-cell mdl-cell--12-col-desktop mdl-cell mdl-cell--12-col-tablet mdl-cell mdl-cell--12-col-phone'>
                  <Route path='/' exact render={props => <DescriptionPage authed={this.state.authed} {...props} />} />
                  <PublicRoute authed={this.state.authed} path='/login' component={LoginPage} />
                  <PublicRoute authed={this.state.authed} path='/signup' component={RegisterPage} />
                  <PrivateRoute authed={this.state.authed} path='/menu' component={MenuPage} />
                  <PrivateRoute authed={this.state.authed} path='/checkin' component={CheckInPage} />
                  <Route render={() => <h3>No Match</h3>} />
                </Switch>
              <div className="mdl-layout-spacer"></div>
            </div>
          </main>
        </div>
      </Router>
    )
  }
}
