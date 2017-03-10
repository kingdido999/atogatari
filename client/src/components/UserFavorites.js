import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

import ScreenshotCard from '../components/ScreenshotCard'

class UserFavorites extends Component {

  render() {
    const { dispatch, favorites, favoriteScreenshots, zooming, isAuthenticated } = this.props

    return (
      <Card.Group>
        {favoriteScreenshots.map(screenshot =>
          <ScreenshotCard
            dispatch={dispatch}
            key={screenshot._id}
            screenshot={screenshot}
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
