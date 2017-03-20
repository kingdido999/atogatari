import React, { Component, PropTypes } from 'react'
import { Segment, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import Header from '../components/Header'
import Footer from '../components/Footer'

class App extends Component {

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props

    return (
      <div className="App">
        <Header
          dispatch={dispatch}
          isAuthenticated={isAuthenticated}
        />

        <Segment vertical>
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
