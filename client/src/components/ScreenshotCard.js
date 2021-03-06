import React, { Component, PropTypes } from 'react'
import { Card, Button } from 'semantic-ui-react'

import ZoomableImage from './ZoomableImage'
import DownloadButton from './DownloadButton'
import TagsButton from './TagsButton'
import FavoriteButton from './FavoriteButton'
import WhatAnimeGaIconButton from './WhatAnimeGaIconButton'
import DeleteButton from './DeleteButton'
import DetailsButton from './DetailsButton'

import { getImageUrl } from '../utils'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  zooming: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
  screenshot: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired,
  owner: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool,
  isFavorited: PropTypes.bool.isRequired
}

class ScreenshotCard extends Component {
  state = {
    active: false
  }

  render() {
    const { zooming, view, screenshot } = this.props
    if (!screenshot) return null
    const { _id, file } = screenshot
    const isSingleView = view === 'single'
    const src = getImageUrl(isSingleView ? file.medium : file.small)

    return (
      <Card
        fluid={isSingleView}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="flex-centered">
          <ZoomableImage
            id={_id}
            src={src}
            dataOriginal={getImageUrl(file.large)}
            zooming={zooming}
          />
        </div>

        {this.renderContent()}
      </Card>
    )
  }

  renderContent = () => {
    const { dispatch, screenshot, isAdmin, isFavorited } = this.props
    if (!screenshot) return null
    const { _id, file, favorites } = screenshot
    const favoritesCount = favorites.length

    return (
      <Card.Content extra>
        <Button.Group fluid compact>
          <TagsButton
            {...this.props}
            tagNames={screenshot.tags}
            screenshotId={_id}
          />
          <FavoriteButton
            {...this.props}
            screenshotId={_id}
            isFavorited={isFavorited}
            favoritesCount={favoritesCount}
          />

          <DownloadButton dispatch={dispatch} screenshotId={_id} file={file} />
          <WhatAnimeGaIconButton url={getImageUrl(file.medium)} />
          {isAdmin && <DeleteButton dispatch={dispatch} screenshotId={_id} />}
          <DetailsButton screenshotId={_id} />
        </Button.Group>
      </Card.Content>
    )
  }
}

ScreenshotCard.propTypes = propTypes

export default ScreenshotCard
