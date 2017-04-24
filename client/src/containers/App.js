import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import { initEnvironment } from '../actions/environment'
import { getAuthedUserIfNeeded } from '../actions/authed'

import NavContainer from './NavContainer'
import FiltersContainer from './FiltersContainer'
import ErrorMessageContainer from './ErrorMessageContainer'
import Footer from '../components/Footer'

import '../styles/app.css'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(initEnvironment())
    dispatch(getAuthedUserIfNeeded())
  }

  render() {
    const { showFilters } = this.props
    return (
      <div className="App site">
        <NavContainer />

        {showFilters && <FiltersContainer />}

        <Segment vertical className="site-content">
          <ErrorMessageContainer />

          {this.props.children}
          <br />
        </Segment>

        <Footer />

      </div>
    )
  }
}

function mapStateToProps(state) {
  const { routing } = state
  const { locationBeforeTransitions } = routing
  const { pathname } = locationBeforeTransitions

  // TODO: improve route matching?
  const showFilters = pathname === '/' || pathname.match('/screenshots')
  // || pathname.match('/tag/')
  // || pathname.match('/favorites')
  // || pathname.match('/uploads')

  return {
    showFilters
  }
}

export default connect(mapStateToProps)(App)
