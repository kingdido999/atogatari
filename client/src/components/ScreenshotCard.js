import React, { Component, PropTypes } from 'react'
import { Card, Button } from 'semantic-ui-react'

import ZoomableImage from './ZoomableImage'

import { getImageUrl, downloadFromUrl } from '../utils'

class ScreenshotCard extends Component {

  handleDownload = (event, data) => {
    const { original_filename } = this.props
    const originalUrl = getImageUrl(original_filename)

    downloadFromUrl(originalUrl, original_filename)
  }

  render () {
    const { id, zooming, dispatch, thumbnail_filename, original_filename } = this.props

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
            <Button icon="favorite" />
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
  original_filename: PropTypes.string.isRequired
}

export default ScreenshotCard
