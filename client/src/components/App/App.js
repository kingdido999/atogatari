import React, { Component, PropTypes } from 'react'
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Header from '../Header'

class App extends Component {

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props

    return (
      <div className="App">
          <Header
            dispatch={dispatch}
            isAuthenticated={isAuthenticated}
            errorMessage={errorMessage}
          />

        <Container>
          {this.props.children}
        </Container>
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
