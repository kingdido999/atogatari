import React, { Component, PropTypes } from 'react'
import { Card } from 'semantic-ui-react'

import ScreenshotCard from './ScreenshotCard'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  zooming: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
  itemsPerRow: PropTypes.number.isRequired,
  screenshots: PropTypes.object.isRequired,
  screenshotIds: PropTypes.array.isRequired,
  userFavorites: PropTypes.object,
  screenshotFavorites: PropTypes.object.isRequired,
}

class ScreenshotCards extends Component {

  render () {
    const { itemsPerRow, view, screenshots, screenshotIds, screenshotFavorites } = this.props

    return (
      <Card.Group itemsPerRow={ view === 'grid' ? itemsPerRow : null } stackable>
        {screenshotIds.map((id, index) =>
          <ScreenshotCard
            { ...this.props }
            key={index}
            screenshot={screenshots[id]}
            screenshotFavorites={screenshotFavorites[id]}
          />
        )}
      </Card.Group>
    )
  }
}

ScreenshotCards.propTypes = propTypes

export default ScreenshotCards
