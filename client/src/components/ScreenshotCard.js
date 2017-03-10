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
    const { _id, path } = screenshot
    const { thumbnail, original } = path
    const isFavorited = favorites.filter(screenshotId => screenshotId === _id).length > 0
    const favoritesCount = screenshot.meta.favoritesCount

    return (
      <Card>
        <ZoomableImage
          id={_id}
          zooming={zooming}
          thumbnail_filename={thumbnail}
          original_filename={original}
        />
        <Card.Content>
          <FavoriteButton
            dispatch={dispatch}
            screenshotId={_id}
            isFavorited={isFavorited}
            favoritesCount={favoritesCount}
            isAuthenticated={isAuthenticated}
          />
          <Button floated="right" icon="download" onClick={this.handleDownload} />
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
