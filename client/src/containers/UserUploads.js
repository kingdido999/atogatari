import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Zooming from 'zooming'

import ScreenshotCards from '../components/ScreenshotCards'
import { getScreenshotsByUserIdIfNeeded } from '../actions/entities'

class UserUploads extends Component {

  componentWillMount () {
    const { dispatch, params } = this.props
    const { userId } = params
    dispatch(getScreenshotsByUserIdIfNeeded(userId))
  }

  render() {
    const { userScreenshots } = this.props

    if (!userScreenshots) return null

    return (
      <ScreenshotCards
        { ...this.props }
        screenshotIds={userScreenshots.ids}
        zooming={new Zooming()}
      />
    )
  }
}

UserUploads.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  screenshots: PropTypes.object.isRequired,
  favorites: PropTypes.object.isRequired,
  userFavorites: PropTypes.object,
  userScreenshots: PropTypes.object,
  screenshotFavorites: PropTypes.object.isRequired,
}

function mapStateToProps (state, ownProps) {
  const { user, entities, userScreenshots, userFavorites, screenshotFavorites } = state
  const { isAuthenticated } = user
  const { screenshots, favorites } = entities
  const { params } = ownProps
  const { userId } = params

  return {
    isAuthenticated,
    screenshots,
    favorites,
    screenshotFavorites,
    userFavorites: userFavorites[userId],
    userScreenshots: userScreenshots[userId]
  }
}

export default connect(mapStateToProps)(UserUploads)
