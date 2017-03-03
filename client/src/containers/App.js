import React, { Component, PropTypes } from 'react'
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Header from '../components/Header'

class App extends Component {

  render() {
    const { dispatch, isAuthenticated, bangumis } = this.props

    return (
      <div className="App">
          <Header
            dispatch={dispatch}
            isAuthenticated={isAuthenticated}
            bangumis={bangumis}
          />

        <Container>
          {this.props.children}
        </Container>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  bangumis: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  const { auth, bangumi } = state
  const { isAuthenticated } = auth
  const { bangumis } = bangumi

  return {
    isAuthenticated,
    bangumis
  }
}

export default connect(mapStateToProps)(App)
