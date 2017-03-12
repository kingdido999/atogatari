import React, { Component, PropTypes } from 'react'
import { Card, Button } from 'semantic-ui-react'

import ZoomableImage from './ZoomableImage'
import FavoriteButton from './FavoriteButton'

import { getImageUrl, downloadFromUrl } from '../utils'

class ScreenshotCard extends Component {

  handleDownload = () => {
    const { original_filename } = this.props
    const originalUrl = getImageUrl(original_filename)

    downloadFromUrl(originalUrl, original_filename)
  }

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
          <Button icon="download" onClick={this.handleDownload} />
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
