import React, { Component } from 'react'
import { connect } from 'react-redux'

import Filters from '../components/Filters'

class FiltersContainer extends Component {

  render() {
    const { showFilters } = this.props
    if (!showFilters) return null
    return <Filters { ...this.props } />
  }
}

function mapStateToProps(state) {
  const { environment, screenshots, routing } = state
  const { isMobile } = environment
  const { nsfw, sortBy, view } = screenshots
  const { locationBeforeTransitions } = routing
  const { pathname } = locationBeforeTransitions

  // TODO: improve route matching?
  const showFilters = pathname === '/' 
  || pathname.match('/tag/') 
  || pathname.match('/favorites') 
  || pathname.match('/uploads')

  return {
    isMobile,
    nsfw,
    view,
    sortBy,
    showFilters
  }
}

export default connect(mapStateToProps)(FiltersContainer)