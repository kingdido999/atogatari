import React, { Component } from 'react'
import { connect } from 'react-redux'

import Nav from '../components/Nav'

class NavContainer extends Component {
  render() {
    return <Nav {...this.props} />
  }
}

function mapStateToProps(state) {
  const { environment, user, search, routing } = state
  const { isMobile } = environment
  const { isAuthenticated, uid } = user
  const { locationBeforeTransitions } = routing
  const { pathname } = locationBeforeTransitions
  const showFilters =
    pathname === '/' ||
    pathname.match('/screenshots') ||
    pathname.match('/tag/') ||
    pathname.match('/favorites') ||
    pathname.match('/uploads')

  const attached = showFilters ? 'top' : false

  return {
    isMobile,
    isAuthenticated,
    uid,
    search,
    showFilters,
    attached
  }
}

export default connect(mapStateToProps)(NavContainer)
