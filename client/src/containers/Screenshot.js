import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Header } from 'semantic-ui-react'
import Zooming from 'zooming'

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
    const { _id, file, episode } = screenshot

    const isFavorited = isAuthenticated &&
      screenshotFavorites[screenshotId].ids.filter(favoriteId => {
        return userFavorites.ids.includes(favoriteId)
      }).length > 0

    const favoritesCount = screenshotFavorites[screenshotId].ids.length

    return (
      <Container text>
        <Header as='h1' textAlign='center'>
          {bangumi.title}
          <Header.Subheader>
            Episode {episode}
          </Header.Subheader>
        </Header>

        <Grid>
          <Grid.Row>
            <Grid.Column>
              <ZoomableImage
                id={_id}
                src={getImageUrl(file.medium)}
                dataOriginal={getImageUrl(file.large)}
                zooming={new Zooming()}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
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
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Container>
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
