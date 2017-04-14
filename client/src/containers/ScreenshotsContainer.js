import React, { Component } from 'react'
import { connect } from 'react-redux'

import ScreenshotsPage from '../components/ScreenshotsPage'
import { getFilteredScreenshotIds } from '../selectors'

class ScreenshotsContainer extends Component {

  render() {
    return <ScreenshotsPage { ...this.props } />
  }
}

function mapStateToProps(state) {
  const { user, entities, screenshots, screenshotFavorites, userFavorites } = state
  const { isAuthenticated, uid } = user
  const { view, itemsPerRow } = screenshots
  
  return {
    isAuthenticated,
    view,
    itemsPerRow,
    screenshots: entities.screenshots,
    screenshotIds: getFilteredScreenshotIds(state),
    screenshotFavorites,
    userFavorites: userFavorites[uid]
  }
}

export default connect(mapStateToProps)(ScreenshotsContainer)
