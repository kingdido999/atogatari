import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Nav from '../components/Nav'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
  uid: PropTypes.string,
  search: PropTypes.object.isRequired,
}

class NavContainer extends Component {

  render() {
    const { showFilters } = this.props

    return (
      <Nav 
        { ...this.props } 
        attached={ showFilters ? 'top' : false } 
      />
    )
  }
}

function mapStateToProps(state) {
  const { environment, user, search, routing } = state
  const { isMobile } = environment
  const { isAuthenticated, uid } = user
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
    search,
    showFilters
  }
}

NavContainer.propTypes = propTypes

export default connect(mapStateToProps)(NavContainer)