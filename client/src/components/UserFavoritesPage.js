import React, { Component, PropTypes } from 'react'
import Zooming from 'zooming'

import ScreenshotCards from '../components/ScreenshotCards'
import { getFavoritesByUserIdIfNeeded } from '../actions/entities'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  screenshots: PropTypes.object.isRequired,
  favorites: PropTypes.object.isRequired,
  userFavorites: PropTypes.object,
  screenshotFavorites: PropTypes.object,
}

class UserFavoritesPage extends Component {
  
  componentWillMount () {
    const { dispatch, params } = this.props
    const { userId } = params
    dispatch(getFavoritesByUserIdIfNeeded(userId))
  }

  render() {
    return (
      <ScreenshotCards
        zooming={new Zooming()}
        { ...this.props }
      />
    )
  }
}

UserFavoritesPage.propTypes = propTypes

export default UserFavoritesPage
