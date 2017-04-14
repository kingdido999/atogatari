import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getFilteredUserScreenshotIds } from '../selectors'
import UserUploadsPage from '../components/UserUploadsPage'

class UserUploadsContainer extends Component {

  render() {
    return <UserUploadsPage { ...this.props } />
  }
  
}

function mapStateToProps (state, ownProps) {
  const { user, entities, screenshots, userFavorites, screenshotFavorites } = state
  const { isAuthenticated } = user
  const { view, itemsPerRow } = screenshots
  const { favorites } = entities
  const { params } = ownProps
  const { userId } = params

  return {
    isAuthenticated,
    view,
    itemsPerRow,
    screenshotIds: getFilteredUserScreenshotIds(state, ownProps),
    screenshots: entities.screenshots,
    favorites,
    screenshotFavorites,
    userFavorites: userFavorites[userId],
  }
}

export default connect(mapStateToProps)(UserUploadsContainer)
