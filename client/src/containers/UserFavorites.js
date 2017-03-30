import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Zooming from 'zooming'

import ScreenshotCards from '../components/ScreenshotCards'
import { getFavoritesByUserIdIfNeeded } from '../actions/entities'

class UserFavorites extends Component {

  componentWillMount () {
    const { dispatch, params } = this.props
    const { userId } = params
    dispatch(getFavoritesByUserIdIfNeeded(userId))
  }

  render() {
    const { favorites, userFavorites } = this.props

    if (!userFavorites) return null

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
  userFavorites: PropTypes.object,
  screenshotFavorites: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
  const { user, entities, screenshotFavorites, userFavorites } = state
  const { isAuthenticated } = user
  const { favorites, screenshots } = entities
  const { params } = ownProps
  const { userId } = params

  return {
    isAuthenticated,
    screenshots,
    favorites,
    screenshotFavorites,
    userFavorites: userFavorites[userId]
  }
}

export default connect(mapStateToProps)(UserFavorites)
