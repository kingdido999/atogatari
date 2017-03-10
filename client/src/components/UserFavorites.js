import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

import ScreenshotCard from '../components/ScreenshotCard'

class UserFavorites extends Component {

  render() {
    const { dispatch, favorites, screenshots, zooming, isAuthenticated } = this.props

    return (
      <Card.Group>
        {favorites.map(favorite =>
          <ScreenshotCard
            dispatch={dispatch}
            key={favorite.screenshotId}
            screenshot={screenshots}
            zooming={zooming}
            favorites={favorites}
            isAuthenticated={isAuthenticated}
          />
        )}
      </Card.Group>
    )
  }
}

export default UserFavorites
