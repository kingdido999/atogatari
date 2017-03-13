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
    const { zooming, dispatch, screenshot, isAuthenticated } = this.props

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
          {/* <FavoriteButton
            dispatch={dispatch}
            screenshotId={_id}
            // isFavorited={isFavorited}
            // favoritesCount={favoritesCount}
            isAuthenticated={isAuthenticated}
          /> */}
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
  screenshot: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  zooming: PropTypes.object.isRequired
}

// function mapStateToProps(state) {
//   const { entities } = state
//   const { screenshots } = entities
//
//   return {
//     screenshots
//   }
// }

// export default connect(mapStateToProps)(ScreenshotCard)
export default ScreenshotCard
