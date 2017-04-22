import React, { Component, PropTypes } from 'react'
import Zooming from 'zooming'

import ScreenshotCards from '../components/ScreenshotCards'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  authedUser: PropTypes.object,
  screenshots: PropTypes.object.isRequired,
  favorites: PropTypes.object.isRequired
}

class UserFavoritesPage extends Component {
  render() {
    const zooming = new Zooming({
      bgColor: '#000'
    })

    return <ScreenshotCards zooming={zooming} {...this.props} />
  }
}

UserFavoritesPage.propTypes = propTypes

export default UserFavoritesPage
