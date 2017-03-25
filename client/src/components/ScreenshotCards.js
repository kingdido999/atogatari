import React, { Component, PropTypes } from 'react'
import { Card } from 'semantic-ui-react'

import ScreenshotCard from './ScreenshotCard'

class ScreenshotCards extends Component {

  render () {
    const { screenshots, screenshotIds, screenshotFavorites } = this.props

    return (
      <Card.Group stackable>
        {screenshotIds.map(id =>
          <ScreenshotCard
            { ...this.props }
            key={id}
            screenshot={screenshots[id]}
            screenshotFavorites={screenshotFavorites[id]}
          />
        )}
      </Card.Group>
    )
  }
}

ScreenshotCards.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  zooming: PropTypes.object.isRequired,
  screenshots: PropTypes.object.isRequired,
  screenshotIds: PropTypes.array.isRequired,
  userFavorites: PropTypes.object.isRequired,
  screenshotFavorites: PropTypes.object.isRequired,
}

export default ScreenshotCards
