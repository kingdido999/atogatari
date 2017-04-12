import React, { Component, PropTypes } from 'react'
import { Segment, Container, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { initEnvironment } from '../actions/environment'
import { getAuthedUserIfNeeded } from '../actions/user'

import Header from '../components/Header'
import Filters from '../components/Filters'

import '../styles/app.css'

class App extends Component {

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(initEnvironment())
    dispatch(getAuthedUserIfNeeded())
  }

  render() {
    const { dispatch, nsfw, sortBy, errorMessage, pathname } = this.props

    return (
      <div className="App site">
        <Header 
          { ...this.props } 
          attached={ pathname === '/' ? 'top' : false } 
        />

        {pathname === '/' &&
          <Filters dispatch={dispatch} sortBy={sortBy} nsfw={nsfw} />
        }

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
  const { environment, user, errorMessage, search, screenshots, routing } = state
  const { isMobile } = environment
  const { isAuthenticated, uid } = user
  const { nsfw, sortBy } = screenshots
  const { locationBeforeTransitions } = routing
  const { pathname } = locationBeforeTransitions

  return {
    isMobile,
    isAuthenticated,
    uid,
    errorMessage,
    search,
    nsfw,
    sortBy,
    pathname
  }
}

export default connect(mapStateToProps)(App)
