import React, { Component, PropTypes } from 'react'
import { Segment, Container, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { initEnvironment } from '../actions/environment'
import { getAuthedUserIfNeeded } from '../actions/user'

import Header from '../components/Header'

import '../styles/app.css'

class App extends Component {

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(initEnvironment())
    dispatch(getAuthedUserIfNeeded())
  }

  render() {
    const { errorMessage } = this.props

    return (
      <div className="App site">
        <Header
          { ...this.props }
        />

        <Segment vertical className="site-content">
          {errorMessage &&
            <Segment basic>
              <Container text>
                <Message error content={errorMessage} />
              </Container>
            </Segment>
          }

          {this.props.children}
        </Segment>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  search: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const { environment, user, errorMessage, search } = state
  const { isMobile } = environment
  const { isAuthenticated, uid } = user

  return {
    isMobile,
    isAuthenticated,
    uid,
    errorMessage,
    search
  }
}

export default connect(mapStateToProps)(App)
