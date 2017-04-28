import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import LoadingBar from 'react-redux-loading-bar'

import { initEnvironment } from '../actions/environment'
import { getAuthedUserIfNeeded } from '../actions/authed'

import NavContainer from './NavContainer'
import ErrorMessageContainer from './ErrorMessageContainer'
import Footer from '../components/Footer'

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

        <LoadingBar showFastActions className="loading-bar" />

        <Segment vertical basic className="site-content">
          <ErrorMessageContainer />

          {this.props.children}
        </Segment>

        <Footer />

      </div>
    )
  }
}

export default connect()(App)
