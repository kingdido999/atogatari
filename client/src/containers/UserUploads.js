import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Zooming from 'zooming'

import ScreenshotCards from '../components/ScreenshotCards'
import { getUploadedScreenshotsIfNeeded } from '../actions/user'

class UserUploads extends Component {

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(getUploadedScreenshotsIfNeeded())
  }

  render() {
    const { userScreenshots } = this.props

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
  userFavorites: PropTypes.object.isRequired,
  userScreenshots: PropTypes.object.isRequired,
  screenshotFavorites: PropTypes.object.isRequired,
}

function mapStateToProps (state, ownProps) {
  const { user, entities, screenshotFavorites } = state
  const { isAuthenticated } = user
  const { screenshots, favorites } = entities

  return {
    isAuthenticated,
    screenshots,
    favorites,
    screenshotFavorites,
    userFavorites: user.favorites,
    userScreenshots: user.screenshots
  }
}

export default connect(mapStateToProps)(UserUploads)
