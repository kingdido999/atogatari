import React, { Component } from 'react'
import { connect } from 'react-redux'

import ScreenshotsPage from '../components/ScreenshotsPage'

class ScreenshotsContainer extends Component {

  render() {
    return <ScreenshotsPage { ...this.props } />
  }
}

function mapStateToProps(state) {
  const { user, entities, screenshots, screenshotFavorites, userFavorites } = state
  const { isAuthenticated, uid } = user
  const { ids, view, itemsPerRow } = screenshots
  
  return {
    isAuthenticated,
    view,
    itemsPerRow,
    screenshots: entities.screenshots,
    screenshotIds: ids,
    screenshotFavorites,
    userFavorites: userFavorites[uid]
  }
}

export default connect(mapStateToProps)(ScreenshotsContainer)
