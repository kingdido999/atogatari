import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar'

import './normalize.css'
import './skeleton.css'
import './App.css'

class App extends Component {
  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props

    return (
      <div className="App">
        <Navbar
          dispatch={dispatch}
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
        />
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {
  const { auth } = state
  const { isAuthenticated, errorMessage } = auth

  return {
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(App)
