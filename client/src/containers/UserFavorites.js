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
    return (
      <ScreenshotCards
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
  const { user, entities, screenshots, screenshotFavorites, userFavorites } = state
  const { isAuthenticated } = user
  const { sortBy, nsfw, view } = screenshots
  const { favorites } = entities
  const { params } = ownProps
  const { userId } = params

  let screenshotIds = userFavorites[userId] 
    ? userFavorites[userId].ids.map(favoriteId => favorites[favoriteId].screenshot)
    : []

  screenshotIds = screenshotIds.filter(id => {
    if (nsfw) return true
    return entities.screenshots[id].nsfw === false
  })

  screenshotIds = screenshotIds.sort((i, j) => {
    if (sortBy === 'date') {
      const dateI = new Date(entities.screenshots[i].createdAt)
      const dateJ = new Date(entities.screenshots[j].createdAt) 

      if (dateI > dateJ) return -1
      if (dateI < dateJ) return 1
      return 0
    }

    if (sortBy === 'popularity') {
      const scoreI = entities.screenshots[i].favorites.length
      const scoreJ = entities.screenshots[j].favorites.length
      return scoreJ - scoreI
    }

    return 0
  })

  return {
    isAuthenticated,
    view,
    screenshotIds,
    screenshots: entities.screenshots,
    favorites,
    screenshotFavorites
  }
}

export default connect(mapStateToProps)(UserFavorites)
