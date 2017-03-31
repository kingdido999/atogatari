import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Container, Segment, Grid, Button, Header, List } from 'semantic-ui-react'
import Zooming from 'zooming'

import Tags from '../components/Tags'
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
    return (
      <Container>
        <Grid stackable>
          <Grid.Row columns={2}>
            <Grid.Column width={4}>
              <Segment.Group>
                {this.renderBangumiSegment()}
                {this.renderEpisodeSegment()}
                {this.renderUploaderSegment()}
                {this.renderTagsSegment()}
                {this.renderActionSegment()}
              </Segment.Group>
            </Grid.Column>

            <Grid.Column width={12}>
              {this.renderImage()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }

  renderBangumiSegment = () => {
    const { bangumis, screenshot } = this.props
    if (!screenshot) return null
    const bangumi = bangumis[screenshot.bangumi]
    if (!bangumi) return null

    return (
      <Segment>
        <Header>
          <Link to={`/bangumi/${bangumi._id}`}>
            {bangumi.title}
          </Link>
        </Header>

        {bangumi.aliases.length > 0 &&
          <List>
            {bangumi.aliases.map(alias =>
              <List.Item>{alias}</List.Item>
            )}
          </List>
        }
      </Segment>
    )
  }

  renderEpisodeSegment = () => {
    const { screenshot } = this.props
    if (!screenshot) return null

    return (
      <Segment>
        Episode {screenshot.episode}
      </Segment>
    )
  }

  renderUploaderSegment = () => {
    const { users, screenshot } = this.props
    if (!screenshot) return null

    const uploader = users[screenshot.user]
    if (!uploader) return null

    return (
      <Segment>
        Uploader: <Link to={`/user/${uploader._id}`}>{uploader.username}</Link>
      </Segment>
    )
  }

  renderTagsSegment = () => {
    const { screenshot } = this.props
    if (!screenshot || screenshot.tags.length === 0) return null

    return (
      <Segment>
        <Tags tags={screenshot.tags} />
      </Segment>
    )
  }

  renderActionSegment = () => {
    const { dispatch, isAuthenticated, screenshot, screenshotFavorites, userFavorites } = this.props
    if (!screenshot) return null
    const { _id, file } = screenshot

    const isFavorited = isAuthenticated && userFavorites &&
      screenshotFavorites[_id].ids.filter(favoriteId => {
        return userFavorites.ids.includes(favoriteId)
      }).length > 0

    const favoritesCount = screenshotFavorites[_id].ids.length

    return (
      <Segment>
        <Button.Group>
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
      </Segment>
    )
  }

  renderImage = () => {
    const { screenshot } = this.props
    if (!screenshot) return null

    const { _id, file } = screenshot

    return (
      <ZoomableImage
        id={_id}
        src={getImageUrl(file.medium)}
        dataOriginal={getImageUrl(file.large)}
        zooming={new Zooming()}
      />
    )
  }
}

Screenshot.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  screenshot: PropTypes.object,
  users: PropTypes.object.isRequired,
  bangumis: PropTypes.object.isRequired,
  screenshotFavorites: PropTypes.object.isRequired,
  userFavorites: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  const { entities, user, screenshotFavorites, userFavorites } = state
  const { users, bangumis, screenshots } = entities
  const { isAuthenticated, uid } = user
  const { screenshotId } = ownProps.params
  const screenshot = screenshots[screenshotId]

  return {
    isAuthenticated,
    screenshot,
    users,
    bangumis,
    screenshotFavorites,
    userFavorites: userFavorites[uid]
  }
}

export default connect(mapStateToProps)(Screenshot)
