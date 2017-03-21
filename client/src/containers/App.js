import React, { Component, PropTypes } from 'react'
import { Segment, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import Header from '../components/Header'
import Footer from '../components/Footer'

import '../styles/app.css'

class App extends Component {

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props

    return (
      <div className="App site">
        <Header
          dispatch={dispatch}
          isAuthenticated={isAuthenticated}
        />

        <Segment vertical className="site-content">
          {errorMessage && <Message error content={errorMessage} />}
          {this.props.children}
        </Segment>

        <Segment vertical>
          <Footer />
        </Segment>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
}

function mapStateToProps(state) {
  const { user, errorMessage } = state
  const { isAuthenticated } = user

  return {
    isAuthenticated,
    errorMessage,
  }
}

export default connect(mapStateToProps)(App)
