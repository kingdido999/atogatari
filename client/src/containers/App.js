import React, { Component, PropTypes } from 'react'
import { Segment, Container, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { getAuthedUserIfNeeded } from '../actions/user'

import Header from '../components/Header'
import Footer from '../components/Footer'

import '../styles/app.css'

class App extends Component {

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(getAuthedUserIfNeeded())
  }

  render() {
    const { dispatch, isAuthenticated, uid, errorMessage } = this.props

    return (
      <div className="App site">
        <Header
          dispatch={dispatch}
          isAuthenticated={isAuthenticated}
          uid={uid}
        />

        {errorMessage &&
          <Segment basic vertical>
            <Container text>
              <Message error content={errorMessage} />
            </Container>
          </Segment>
        }

        <Segment vertical className="site-content">
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
  const { isAuthenticated, uid } = user

  return {
    isAuthenticated,
    uid,
    errorMessage,
  }
}

export default connect(mapStateToProps)(App)
