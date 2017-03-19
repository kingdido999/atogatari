import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

import ScreenshotCard from './ScreenshotCard'

class ScreenshotCards extends Component {

  render () {
    const { dispatch, isAuthenticated, zooming, screenshots, screenshotIds, userFavorites, screenshotFavorites } = this.props

    return (
      <Card.Group>
        {screenshotIds.map(id =>
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

export default ScreenshotCards
