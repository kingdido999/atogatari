import React, { Component, PropTypes } from 'react'
import { Segment, Container, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import Header from '../components/Header'

// import { getBangumis } from '../actions/entities'
// import { getUserFavorites, getUploadedScreenshots } from '../actions/authed'

class App extends Component {

  // componentWillMount () {
  //   const { dispatch, isAuthenticated } = this.props
    // dispatch(getBangumis())
    //
    // if (isAuthenticated) {
    //   dispatch(getUserFavorites())
    //   dispatch(getUploadedScreenshots())
    // }
  // }

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
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
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
