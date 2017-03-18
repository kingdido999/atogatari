import React, { Component, PropTypes } from 'react'
import { Card } from 'semantic-ui-react'

import ScreenshotCard from '../components/ScreenshotCard'
import { getUserFavoritesIfNeeded } from '../actions/user'

class UserFavorites extends Component {

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(getUserFavoritesIfNeeded())
  }

  render() {
    const { dispatch, isAuthenticated, screenshots, favorites, screenshotFavorites, userFavorites, zooming } = this.props
    const favoriteScreenshotIds = userFavorites.ids.map(favoriteId => {
      return favorites[favoriteId].screenshot
    })

    return (
      <Card.Group>
        {favoriteScreenshotIds.map(id =>
          <ScreenshotCard
            key={id}
            dispatch={dispatch}
            isAuthenticated={isAuthenticated}
            zooming={zooming}
            screenshot={screenshots[id]}
            userFavorites={userFavorites}
            screenshotFavorites={screenshotFavorites[id]}
          />
        )}
      </Card.Group>
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
