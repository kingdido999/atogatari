import React, { Component, PropTypes } from 'react'
import { Segment, Container, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import Header from '../components/Header'

class App extends Component {

  render() {
    const { isAuthenticated, errorMessage } = this.props

    return (
      <div className="App">
        <Header
          isAuthenticated={isAuthenticated}
        />

        <Container>
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
