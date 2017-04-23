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
  const { environment, filter, screenshotLists, routing, ui } = state
  const { isMobile } = environment
  const { view } = ui
  const { nsfw, sortBy, page, limit } = filter
  const { locationBeforeTransitions } = routing
  const { pathname } = locationBeforeTransitions
  const key = JSON.stringify(filter)
  const screenshotList = screenshotLists[key]

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
    total: screenshotList ? screenshotList.total : 0,
    pages: screenshotList ? screenshotList.pages : 1,
    page,
    limit,
    showFilters
  }
}

export default connect(mapStateToProps)(FiltersContainer)
