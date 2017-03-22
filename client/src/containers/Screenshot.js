import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Container, Button } from 'semantic-ui-react'
import Zooming from 'zooming'

import Tags from '../components/Tags'
import BangumiTitle from '../components/BangumiTitle'
import ZoomableImage from '../components/ZoomableImage'
import DownloadButton from '../components/buttons/DownloadButton'
import FavoriteButton from '../components/buttons/FavoriteButton'

import { getScreenshotIfNeeded } from '../actions/entities'
import { getImageUrl } from '../utils'

class Screenshot extends Component {

  componentWillMount () {
    const { params, dispatch } = this.props
    const { screenshotId } = params
    dispatch(getScreenshotIfNeeded(screenshotId))
  }

  componentWillReceiveProps(nextProps) {
    const { params, dispatch } = this.props
    const screenshotId = nextProps.params.screenshotId

    if (screenshotId !== params.screenshotId) {
      dispatch(getScreenshotIfNeeded(screenshotId))
    }
  }

  render () {
    const { params, dispatch, isAuthenticated, bangumis, screenshots, screenshotFavorites, userFavorites } = this.props
    const { screenshotId } = params
    const screenshot = screenshots[screenshotId]
    if (!screenshot) return null

    const bangumi = bangumis[screenshot.bangumi]

    if (!bangumi) return null
    const { _id, file } = screenshot

    const isFavorited = isAuthenticated &&
      screenshotFavorites[screenshotId].ids.filter(favoriteId => {
        return userFavorites.ids.includes(favoriteId)
      }).length > 0

    const favoritesCount = screenshotFavorites[screenshotId].ids.length

    return (
      <div>
        <Container>
          <BangumiTitle size='huge' bangumi={bangumi} />

          <ZoomableImage
            id={_id}
            src={getImageUrl(file.medium)}
            dataOriginal={getImageUrl(file.large)}
            zooming={new Zooming()}
          />
        </Container>

        <br/>

        <Container>
          <Tags tags={screenshot.tags} />

          <Button.Group >
            <FavoriteButton
              dispatch={dispatch}
              screenshotId={_id}
              isFavorited={isFavorited}
              favoritesCount={favoritesCount}
              isAuthenticated={isAuthenticated}
            />
            <DownloadButton
              file={file}
            />
          </Button.Group>

        </Container>

      </div>

    )
  }
}

Screenshot.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

function mapStateToProps(state, ownProps) {
  const { entities, user, screenshotFavorites } = state
  const { users, bangumis, screenshots } = entities
  const { isAuthenticated, favorites } = user

  return {
    isAuthenticated,
    users,
    bangumis,
    screenshots,
    screenshotFavorites,
    userFavorites: favorites
  }
}

export default connect(mapStateToProps)(Screenshot)
