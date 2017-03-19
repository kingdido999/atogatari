import React, { Component, PropTypes } from 'react'

import ScreenshotCards from '../components/ScreenshotCards'
import { getUserFavoritesIfNeeded } from '../actions/user'

class UserFavorites extends Component {

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(getUserFavoritesIfNeeded())
  }

  render() {
    const { favorites, userFavorites } = this.props
    const favoriteScreenshotIds = userFavorites.ids.map(favoriteId => {
      return favorites[favoriteId].screenshot
    })

    return (
      <ScreenshotCards
        screenshotIds={favoriteScreenshotIds}
        { ...this.props }
      />
    )
  }
}

UserFavorites.propTypes = {
  dispatch: PropTypes.func,
  screenshots: PropTypes.object,
  zooming: PropTypes.object,
  isAuthenticated: PropTypes.bool
}

export default UserFavorites
