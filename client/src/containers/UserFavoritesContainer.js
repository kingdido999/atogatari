import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getFilteredUserFavoriteScreenshotIds } from '../selectors'
import UserFavoritesPage from '../components/UserFavoritesPage'

class UserFavoritesContainer extends Component {
  render() {
    return <UserFavoritesPage { ...this.props } />
  }
}

function mapStateToProps(state, ownProps) {
  const { user, entities, screenshots, screenshotFavorites } = state
  const { isAuthenticated } = user
  const { view, itemsPerRow } = screenshots
  const { favorites } = entities

  return {
    isAuthenticated,
    view,
    itemsPerRow,
    screenshotIds: getFilteredUserFavoriteScreenshotIds(state, ownProps),
    screenshots: entities.screenshots,
    favorites,
    screenshotFavorites
  }
}

export default connect(mapStateToProps)(UserFavoritesContainer)