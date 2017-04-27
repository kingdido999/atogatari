import React, { Component, PropTypes } from 'react'

import ScreenshotCards from '../components/ScreenshotCards'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  authedUser: PropTypes.object,
  screenshots: PropTypes.object.isRequired,
  favorites: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired,
  screenshotIds: PropTypes.array.isRequired
}

class UserFavoritesPage extends Component {
  render() {
    return <ScreenshotCards {...this.props} />
  }
}

UserFavoritesPage.propTypes = propTypes

export default UserFavoritesPage
