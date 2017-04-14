import React, { Component, PropTypes } from 'react'
import Zooming from 'zooming'

import ScreenshotCards from '../components/ScreenshotCards'
import { getScreenshotsByUserIdIfNeeded } from '../actions/entities'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  screenshots: PropTypes.object.isRequired,
  favorites: PropTypes.object.isRequired,
  userFavorites: PropTypes.object,
  userScreenshots: PropTypes.object,
  screenshotFavorites: PropTypes.object.isRequired,
}

class UserUploadsPage extends Component {
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

UserUploadsPage.propTypes = propTypes

export default UserUploadsPage