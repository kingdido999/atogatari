import React, { Component, PropTypes } from 'react'
import { Card, Button } from 'semantic-ui-react'

import ZoomableImage from './ZoomableImage'
import DownloadButton from './DownloadButton'
import FavoriteButton from './FavoriteButton'
import WhatAnimeGaIconButton from './WhatAnimeGaIconButton'
import DetailsButton from './DetailsButton'
import DeleteButton from './DeleteButton'

import { getImageUrl } from '../utils'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  zooming: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
  screenshot: PropTypes.object.isRequired,
  owner: PropTypes.object,
  isAdmin: PropTypes.bool,
  isOwner: PropTypes.bool,
  isFavorited: PropTypes.bool.isRequired
}

class ScreenshotCard extends Component {
  render() {
    const {
      dispatch,
      zooming,
      view,
      screenshot,
      isOwner,
      isAdmin,
      isFavorited
    } = this.props
    if (!screenshot) return null
    const { _id, file, nsfw, favorites } = screenshot

    const favoritesCount = favorites.length
    const isSingleView = view === 'single'
    const src = getImageUrl(isSingleView ? file.medium : file.small)

    return (
      <Card fluid={isSingleView} color={nsfw ? 'yellow' : null}>
        <div className="flex-centered bg-black">
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
              {...this.props}
              screenshotId={_id}
              isFavorited={isFavorited}
              favoritesCount={favoritesCount}
            />

            <DownloadButton
              dispatch={dispatch}
              screenshotId={_id}
              file={file}
            />
            <WhatAnimeGaIconButton url={getImageUrl(file.medium)} />
            {(isOwner || isAdmin) &&
              <DeleteButton dispatch={dispatch} screenshotId={_id} />}
            <DetailsButton screenshotId={_id} />
          </Button.Group>
        </Card.Content>
      </Card>
    )
  }
}

ScreenshotCard.propTypes = propTypes

export default ScreenshotCard
