import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import Zooming from 'zooming'

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
      <Grid columns={1}>
        <Grid.Row>
          <BangumiTitle size='huge' bangumi={bangumi} />
        </Grid.Row>

        <Grid.Row>
          <ZoomableImage
            id={_id}
            src={getImageUrl(file.medium)}
            dataOriginal={getImageUrl(file.large)}
            zooming={new Zooming()}
          />
        </Grid.Row>

        <Grid.Row>
          <div className='ui two buttons'>
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
          </div>
        </Grid.Row>

      </Grid>
    )
  }
}

Screenshot.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  screenshot: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  const { entities, user, screenshotFavorites } = state
  const { bangumis, screenshots } = entities
  const { isAuthenticated, favorites } = user

  return {
    isAuthenticated,
    bangumis,
    screenshots,
    screenshotFavorites,
    userFavorites: favorites
  }
}

export default connect(mapStateToProps)(Screenshot)
