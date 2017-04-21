import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getUserFavoriteScreenshotIds } from '../selectors'
import UserFavoritesPage from '../components/UserFavoritesPage'

class UserFavoritesContainer extends Component {
  render() {
    return <UserFavoritesPage {...this.props} />
  }
}

function mapStateToProps(state, ownProps) {
  const {
    user,
    entities,
    screenshots,
    screenshotFavorites,
    userFavorites
  } = state
  const { isAuthenticated } = user
  const { view, itemsPerRow } = screenshots
  const { favorites, users } = entities
  const { params } = ownProps
  const { userId } = params

  return {
    isAuthenticated,
    view,
    itemsPerRow,
    users,
    uid: userId,
    screenshotIds: getUserFavoriteScreenshotIds(state, ownProps),
    screenshots: entities.screenshots,
    favorites,
    screenshotFavorites,
    userFavorites: userFavorites[userId]
  }
}

export default connect(mapStateToProps)(UserFavoritesContainer)
