import React, { Component, PropTypes } from 'react'
import { Card } from 'semantic-ui-react'

import ZoomableImage from './ZoomableImage'
import DownloadButton from './DownloadButton'
import FavoriteButton from './FavoriteButton'

class ScreenshotCard extends Component {

  render () {
    const { zooming, dispatch, screenshot, isAuthenticated } = this.props
    const { _id, file } = screenshot

    const isFavorited = isAuthenticated &&
      screenshot.favorites
      .filter(favorite => favorite.screenshot === _id)
      .length > 0

    const favoritesCount = screenshot.favorites.length

    return (
      <Card>
        <ZoomableImage
          id={_id}
          file={file}
          zooming={zooming}
        />
        <Card.Content>
          <DownloadButton
            file={file}
          />
          <FavoriteButton
            dispatch={dispatch}
            screenshotId={_id}
            isFavorited={isFavorited}
            favoritesCount={favoritesCount}
            isAuthenticated={isAuthenticated}
          />
        </Card.Content>
      </Card>
    )
  }
}

ScreenshotCard.propTypes = {
  zooming: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  screenshot: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default ScreenshotCard
