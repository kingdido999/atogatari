import React, { Component } from 'react'
import { connect } from 'react-redux'

import Filters from '../components/Filters'

class FiltersContainer extends Component {
  render() {
    return <Filters {...this.props} />
  }
}

function mapStateToProps(state) {
  const { environment, filter, screenshotLists, ui } = state
  const { isMobile } = environment
  const { view } = ui
  const { nsfw, sortBy, page, limit } = filter
  const key = JSON.stringify(filter)
  const screenshotList = screenshotLists[key]

  return {
    isMobile,
    nsfw,
    view,
    sortBy,
    total: screenshotList ? screenshotList.total : 0,
    pages: screenshotList ? screenshotList.pages : 1,
    page,
    limit
  }
}

export default connect(mapStateToProps)(FiltersContainer)
