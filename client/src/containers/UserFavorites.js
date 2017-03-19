import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Zooming from 'zooming'

import ScreenshotCards from '../components/ScreenshotCards'
import { getUserFavoritesIfNeeded } from '../actions/user'

class UserFavorites extends Component {

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(getUserFavoritesIfNeeded())
  }

  render() {
    const { favorites, userFavorites } = this.props
    const favoriteScreenshotIds =
      userFavorites.ids.map(favoriteId => favorites[favoriteId].screenshot)

    return (
      <ScreenshotCards
        screenshotIds={favoriteScreenshotIds}
        zooming={new Zooming()}
        { ...this.props }
      />
    )
  }
}

UserFavorites.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  screenshots: PropTypes.object.isRequired,
  favorites: PropTypes.object.isRequired,
  userFavorites: PropTypes.object.isRequired,
  screenshotFavorites: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const { user, entities, screenshotFavorites } = state
  const { isAuthenticated } = user
  const { favorites, screenshots } = entities

  return {
    isAuthenticated,
    screenshots,
    favorites,
    screenshotFavorites,
    userFavorites: user.favorites,
  }
}

export default connect(mapStateToProps)(UserFavorites)
