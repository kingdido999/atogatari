import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'

import { initEnvironment } from '../actions/environment'
import { getAuthedUserIfNeeded } from '../actions/authed'

import NavContainer from './NavContainer'
import ErrorMessageContainer from './ErrorMessageContainer'

import '../styles/app.css'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(initEnvironment())
    dispatch(getAuthedUserIfNeeded())
  }

  render() {
    return (
      <div className="App site">
        <NavContainer />

        <LoadingBar updateTime={50} className="loading-bar" />

        <div className="site-content">
          <ErrorMessageContainer />

          {this.props.children}
        </div>

      </div>
    )
  }
}

export default connect()(App)
