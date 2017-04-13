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
    return (
      <ScreenshotCards
        { ...this.props }
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
  const { user, entities, screenshots, userScreenshots, userFavorites, screenshotFavorites } = state
  const { isAuthenticated } = user
  const { sortBy, nsfw, view } = screenshots
  const { favorites } = entities
  const { params } = ownProps
  const { userId } = params

  let screenshotIds = userScreenshots[userId] 
    ? userScreenshots[userId].ids
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
    screenshotFavorites,
    userFavorites: userFavorites[userId],
    userScreenshots: userScreenshots[userId]
  }
}

export default connect(mapStateToProps)(UserUploads)
