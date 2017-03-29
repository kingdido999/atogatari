import React, { Component, PropTypes } from 'react'
import { Card, Button } from 'semantic-ui-react'

import ZoomableImage from './ZoomableImage'
import DownloadButton from './buttons/DownloadButton'
import FavoriteButton from './buttons/FavoriteButton'
import DetailsButton from './buttons/DetailsButton'

import { getImageUrl } from '../utils'

class ScreenshotCard extends Component {

  render () {
    const { zooming, screenshot, userFavorites, screenshotFavorites } = this.props
    if (!screenshot || !screenshotFavorites) return null

    const { _id, file } = screenshot

    const isFavorited = userFavorites
    ? userFavorites.ids.find(favoriteId => {
        return screenshotFavorites.ids.includes(favoriteId)
      }) !== undefined
    : false

    const favoritesCount = screenshotFavorites.ids.length

    return (
      <Card>
        <ZoomableImage
          id={_id}
          src={getImageUrl(file.small)}
          dataOriginal={getImageUrl(file.large)}
          zooming={zooming}
        />

        <Card.Content>
          <Button.Group fluid>
            <FavoriteButton
              { ...this.props }
              screenshotId={_id}
              isFavorited={isFavorited}
              favoritesCount={favoritesCount}
            />

            <DownloadButton
              file={file}
            />

            <DetailsButton
              screenshotId={_id}
            />
          </Button.Group>
        </Card.Content>
      </Card>
    )
  }
}

ScreenshotCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  zooming: PropTypes.object.isRequired,
  screenshot: PropTypes.object,
  screenshotFavorites: PropTypes.object,
  userFavorites: PropTypes.object,
}

export default ScreenshotCard
