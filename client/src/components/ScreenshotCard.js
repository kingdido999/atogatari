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
    const { zooming, dispatch, screenshot, favorites, isAuthenticated } = this.props
    const { _id, thumbnail_filename, original_filename } = screenshot
    const isFavorited = favorites.filter(favorite => favorite.screenshot._id === _id).length > 0

    return (
      <Card>
        <ZoomableImage
          id={_id}
          zooming={zooming}
          thumbnail_filename={thumbnail_filename}
          original_filename={original_filename}
        />
        <Card.Content>
          <Button.Group basic fluid>
            <FavoriteButton
              dispatch={dispatch}
              screenshotId={_id}
              isFavorited={isFavorited}
              isAuthenticated={isAuthenticated}
            />
            <Button icon="download" onClick={this.handleDownload} />
          </Button.Group>
        </Card.Content>
      </Card>
    )
  }
}

ScreenshotCard.propTypes = {
  zooming: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  screenshot: PropTypes.object.isRequired,
  favorites: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default ScreenshotCard
