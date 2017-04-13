import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Zooming from 'zooming'

import ScreenshotCards from '../components/ScreenshotCards'
import { getScreenshotsByUserIdIfNeeded } from '../actions/entities'
import { getFilteredUserScreenshotIds } from '../selectors'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  screenshots: PropTypes.object.isRequired,
  favorites: PropTypes.object.isRequired,
  userFavorites: PropTypes.object,
  userScreenshots: PropTypes.object,
  screenshotFavorites: PropTypes.object.isRequired,
}

class UserUploadsContainer extends Component {
  componentWillMount () {
    const { dispatch, params } = this.props
    const { userId } = params
    dispatch(getScreenshotsByUserIdIfNeeded(userId))
  }

  render() {
    return (
      <ScreenshotCards
        { ...this.props }
        zooming={new Zooming()}
      />
    )
  }
}

function mapStateToProps (state, ownProps) {
  const { user, entities, screenshots, userFavorites, screenshotFavorites } = state
  const { isAuthenticated } = user
  const { view } = screenshots
  const { favorites } = entities
  const { params } = ownProps
  const { userId } = params

  return {
    isAuthenticated,
    view,
    screenshotIds: getFilteredUserScreenshotIds(state, ownProps),
    screenshots: entities.screenshots,
    favorites,
    screenshotFavorites,
    userFavorites: userFavorites[userId],
  }
}

UserUploadsContainer.propTypes = propTypes

export default connect(mapStateToProps)(UserUploadsContainer)
