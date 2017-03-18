import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Container, Header, Segment } from 'semantic-ui-react'
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
    const { params, dispatch, isAuthenticated, bangumis, screenshots, allFavorites, userFavorites } = this.props
    const { screenshotId } = params
    const screenshot = screenshots[screenshotId]

    if (!screenshot) return null
    const { _id, file, episode } = screenshot

    console.log(screenshot)
    const bangumi = bangumis[screenshot.bangumi]
    if (!bangumi) return null

    const screenshotFavorites = allFavorites.allIds.filter(favoriteId => {
      return allFavorites.byId[favoriteId].screenshot === _id
    })

    const isFavorited = isAuthenticated &&
      screenshotFavorites.filter(favoriteId => {
        return userFavorites.allIds.includes(favoriteId)
      }).length > 0

    const favoritesCount = screenshotFavorites.length

    return (
      <Container>
        <Header as='h1' textAlign='center'>
          {bangumi.title}
          <Header.Subheader>
            Episode {episode}
          </Header.Subheader>
        </Header>

        <ZoomableImage
          id={_id}
          src={getImageUrl(file.medium)}
          dataOriginal={getImageUrl(file.large)}
          zooming={new Zooming()}
        />

        <Segment basic>
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
        </Segment>

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
  const { entities, user, favorites, authed } = state
  const { bangumis, screenshots } = entities
  const { isAuthenticated } = user

  return {
    isAuthenticated,
    bangumis,
    screenshots,
    allFavorites: favorites,
    userFavorites: authed.favorites
  }
}

export default connect(mapStateToProps)(Screenshot)
