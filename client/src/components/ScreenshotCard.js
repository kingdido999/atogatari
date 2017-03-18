import React, { Component, PropTypes } from 'react'
import { Card } from 'semantic-ui-react'

import ZoomableImage from './ZoomableImage'
import DownloadButton from './buttons/DownloadButton'
import FavoriteButton from './buttons/FavoriteButton'
import DetailsButton from './buttons/DetailsButton'

import { getImageUrl } from '../utils'

class ScreenshotCard extends Component {

  render () {
    const { dispatch, isAuthenticated, zooming, screenshot, favorites, userFavorites } = this.props

    if (!screenshot) return null
    const { _id, file } = screenshot

    const screenshotFavorites = favorites.allIds.filter(favoriteId => {
      return favorites[favoriteId].screenshot === _id
    })

    const isFavorited = isAuthenticated &&
      screenshotFavorites.filter(favoriteId => {
        return userFavorites.allIds.includes(favoriteId)
      }).length > 0

    const favoritesCount = screenshotFavorites.length

    return (
      <Card>
        <ZoomableImage
          id={_id}
          src={getImageUrl(file.small)}
          dataOriginal={getImageUrl(file.large)}
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
          <DetailsButton
            floated="right"
            screenshotId={_id}
          />
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
  favorites: PropTypes.object.isRequired,
  userFavorites: PropTypes.object.isRequired,
}

export default ScreenshotCard
