import React, { Component, PropTypes } from 'react'
import { Segment, Container, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import Header from '../components/Header'

class App extends Component {

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props

    return (
      <div className="App">
        <Header
          dispatch={dispatch}
          isAuthenticated={isAuthenticated}
        />

        <Container fluid>
          {errorMessage &&
            <Segment basic>
              <Message error content={errorMessage} />
            </Segment>
          }

          {this.props.children}
        </Container>
      </div>
    )
  }
}

App.propTypes = {
  errorMessage: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { user, errorMessage } = state
  const { isAuthenticated } = user

  return {
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(App)
