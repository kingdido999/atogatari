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
    const { id, zooming, dispatch, thumbnail_filename, original_filename, favorites } = this.props

    return (
      <Card>
        <ZoomableImage
          id={id}
          zooming={zooming}
          dispatch={dispatch}
          thumbnail_filename={thumbnail_filename}
          original_filename={original_filename}
        />
        <Card.Content>
          <Button.Group basic fluid>
            <FavoriteButton
              dispatch={dispatch}
              screenshotId={id}
              favorite={favorites.includes(id)}
            />
            <Button icon="download" onClick={this.handleDownload} />
          </Button.Group>
        </Card.Content>
      </Card>
    )
  }
}

ScreenshotCard.propTypes = {
  id: PropTypes.string.isRequired,
  zooming: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  thumbnail_filename: PropTypes.string.isRequired,
  original_filename: PropTypes.string.isRequired,
  favorites: PropTypes.array.isRequired
}

export default ScreenshotCard
