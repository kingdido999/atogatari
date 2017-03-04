import React, { Component, PropTypes } from 'react'
import { Container, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import Header from '../components/Header'

class App extends Component {

  render() {
    const { dispatch, isAuthenticated, bangumis, errorMessage } = this.props

    return (
      <div className="App">
        <Header
          dispatch={dispatch}
          isAuthenticated={isAuthenticated}
          bangumis={bangumis}
        />

        <Container>
          {errorMessage &&
            <Message error content={errorMessage} />
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
  isAuthenticated: PropTypes.bool.isRequired,
  bangumis: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  const { auth, bangumi, errorMessage } = state
  const { isAuthenticated } = auth
  const { bangumis } = bangumi

  return {
    isAuthenticated,
    bangumis,
    errorMessage
  }
}

export default connect(mapStateToProps)(App)