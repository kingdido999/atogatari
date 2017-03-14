import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Container, Header, Segment } from 'semantic-ui-react'
import Zooming from 'zooming'

import ZoomableImage from '../components/ZoomableImage'
import DownloadButton from '../components/buttons/DownloadButton'
import FavoriteButton from '../components/buttons/FavoriteButton'

import { getScreenshot } from '../actions/entities'
import { getImageUrl } from '../utils'

class Screenshot extends Component {

  componentWillMount () {
    const { params, dispatch } = this.props
    const { screenshotId } = params
    dispatch(getScreenshot({ id: screenshotId }))
  }

  componentWillReceiveProps(nextProps) {
    const { params, dispatch } = this.props

    const screenshotId = nextProps.params.screenshotId
    if (screenshotId !== params.screenshotId) {
      dispatch(getScreenshot({ id: screenshotId }))
    }
  }

  render () {
    const { dispatch, isAuthenticated, selectedScreenshot } = this.props

    if (!selectedScreenshot) return null

    const { _id, file, episode, bangumi } = selectedScreenshot

    const zooming = new Zooming()

    const isFavorited = isAuthenticated &&
      selectedScreenshot.favorites
      .filter(favorite => favorite.screenshot === _id)
      .length > 0

    const favoritesCount = selectedScreenshot.favorites.length

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
          zooming={zooming}
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
}

function mapStateToProps(state) {
  const { user, entities } = state
  const { isAuthenticated } = user
  const { selectedScreenshot } = entities

  return {
    isAuthenticated,
    selectedScreenshot
  }
}

export default connect(mapStateToProps)(Screenshot)
