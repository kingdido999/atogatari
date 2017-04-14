import React, { Component, PropTypes } from 'react'
import { Card, Button } from 'semantic-ui-react'

import ZoomableImage from './ZoomableImage'
import DownloadButton from './DownloadButton'
import FavoriteButton from './FavoriteButton'
import DetailsButton from './DetailsButton'

import { getImageUrl } from '../utils'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  zooming: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
  screenshot: PropTypes.object,
  screenshotFavorites: PropTypes.object,
  userFavorites: PropTypes.object,
}

class ScreenshotCard extends Component {

  render () {
    const { dispatch, isAuthenticated, zooming, view, screenshot, userFavorites, screenshotFavorites } = this.props
    if (!screenshot || !screenshotFavorites) return null
    const { _id, file, nsfw } = screenshot

    const isFavorited = isAuthenticated && userFavorites
    ? userFavorites.ids.find(favoriteId => {
        return screenshotFavorites.ids.includes(favoriteId)
      }) !== undefined
    : false

    const favoritesCount = screenshotFavorites.ids.length
    const isSingleView = view === 'single'
    const src = getImageUrl(isSingleView ? file.medium : file.small)

    return (
      <Card fluid={isSingleView} color={nsfw ? 'yellow' : null} raised>
        <div className='flex-centered bg-black'>
          <ZoomableImage
            id={_id}
            src={src}
            dataOriginal={getImageUrl(file.large)}
            zooming={zooming}
          />
        </div>

        <Card.Content extra>
          <Button.Group fluid compact>
            <FavoriteButton
              { ...this.props }
              screenshotId={_id}
              isFavorited={isFavorited}
              favoritesCount={favoritesCount}
            />

            <DownloadButton dispatch={dispatch} screenshotId={_id} file={file} />
            <DetailsButton screenshotId={_id} />
          </Button.Group>
        </Card.Content>
      </Card>
    )
  }
}

ScreenshotCard.propTypes = propTypes

export default ScreenshotCard
