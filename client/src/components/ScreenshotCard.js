import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'

import ZoomableImage from './ZoomableImage'
import DownloadButton from './buttons/DownloadButton'
import FavoriteButton from './buttons/FavoriteButton'
import DetailsButton from './buttons/DetailsButton'

import { getImageUrl } from '../utils'

class ScreenshotCard extends Component {

  render () {
    const { zooming, dispatch, screenshotId, screenshots, isAuthenticated } = this.props
    const screenshot = screenshots[screenshotId]

    if (!screenshot) return null

    const { _id, file } = screenshot

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
            // isFavorited={isFavorited}
            // favoritesCount={favoritesCount}
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
  zooming: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  screenshotId: PropTypes.string.isRequired,
  screenshots: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { entities } = state
  const { screenshots } = entities

  return {
    screenshots
  }
}

export default connect(mapStateToProps)(ScreenshotCard)
