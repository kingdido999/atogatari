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
    const { errorMessage, showFilters } = this.props

    return (
      <div className="App site">
        <Header 
          { ...this.props } 
          attached={ showFilters ? 'top' : false } 
        />

        {showFilters &&
          <Filters { ...this.props } />
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
  const { nsfw, sortBy, view } = screenshots
  const { locationBeforeTransitions } = routing
  const { pathname } = locationBeforeTransitions
  const showFilters = pathname === '/' 
  || pathname.match('/tag/') 
  || pathname.match('/favorites') 
  || pathname.match('/uploads')

  return {
    isMobile,
    isAuthenticated,
    uid,
    errorMessage,
    search,
    nsfw,
    view,
    sortBy,
    showFilters
  }
}

export default connect(mapStateToProps)(App)
