import React, { Component } from 'react'
import { connect } from 'react-redux'

import Filters from '../components/Filters'

class FiltersContainer extends Component {
  render() {
    const { showFilters } = this.props
    if (!showFilters) return null
    return <Filters {...this.props} />
  }
}

function mapStateToProps(state) {
  const { environment, filter, routing, ui } = state
  const { isMobile } = environment
  const { view } = ui
  const { nsfw, sortBy, total, pages, page, limit } = filter
  const { locationBeforeTransitions } = routing
  const { pathname } = locationBeforeTransitions

  // TODO: improve route matching?
  const showFilters = pathname === '/' || pathname.match('/screenshots')
  // || pathname.match('/tag/')
  // || pathname.match('/favorites')
  // || pathname.match('/uploads')

  return {
    isMobile,
    nsfw,
    view,
    sortBy,
    total,
    pages,
    page,
    limit,
    showFilters
  }
}

export default connect(mapStateToProps)(FiltersContainer)
