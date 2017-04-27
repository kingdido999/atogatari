import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import {
  Container,
  Segment,
  Grid,
  Button,
  Header,
  Divider
} from 'semantic-ui-react'
import moment from 'moment'

import Tags from './Tags'
import AddTagDropdown from './AddTagDropdown'
import ZoomableImage from './ZoomableImage'
import DownloadButton from './DownloadButton'
import FavoriteButton from './FavoriteButton'
import WhatAnimeGaButton from './WhatAnimeGaButton'
import DeleteButton from './DeleteButton'

import { getImageUrl } from '../utils'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOwner: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  authedUser: PropTypes.object,
  screenshot: PropTypes.object,
  users: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired
}

class ScreenshotPage extends Component {
  render() {
    return (
      <Container>
        <Grid stackable>
          <Grid.Row columns={2}>
            <Grid.Column width={12}>
              <Segment>{this.renderImage()}</Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment.Group>
                <Segment>{this.renderUploader()}</Segment>
                <Segment>{this.renderTags()}</Segment>
                <Segment>{this.renderWhatanimegaButton()}</Segment>
                <Segment>{this.renderActionButtons()}</Segment>
              </Segment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
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
      />
    )
  }

  renderUploader = () => {
    const { users, screenshot } = this.props
    if (!screenshot) return null

    const uploader = users[screenshot.user]
    if (!uploader) return null

    return (
      <Header size="small">
        <Link to={`/user/${uploader._id}`}>{uploader.username}</Link>
        <Header.Subheader>
          {moment(screenshot.createdAt).fromNow()}
        </Header.Subheader>
      </Header>
    )
  }

  renderTags = () => {
    const { dispatch, authedUser, screenshot } = this.props
    if (!screenshot) return null

    return (
      <div>
        <Tags
          {...this.props}
          tagNames={screenshot.tags}
          screenshotId={screenshot._id}
          deletable={true}
        />

        {screenshot.tags.length > 0 && authedUser && <Divider />}

        {authedUser &&
          <AddTagDropdown
            dispatch={dispatch}
            screenshotId={screenshot._id}
            fluid={true}
          />}
      </div>
    )
  }

  renderWhatanimegaButton = () => {
    const { screenshot } = this.props
    if (!screenshot) return null
    const { file } = screenshot

    return <WhatAnimeGaButton url={getImageUrl(file.medium)} />
  }

  renderActionButtons = () => {
    const { dispatch, isOwner, isAdmin, authedUser, screenshot } = this.props
    if (!screenshot) return null
    const { _id, file, favorites } = screenshot

    const isFavorited = authedUser
      ? authedUser.favorites.find(id => favorites.includes(id)) !== undefined
      : false

    const favoritesCount = favorites.length

    return (
      <Button.Group size="large" fluid>
        <FavoriteButton
          dispatch={dispatch}
          isAuthenticated={authedUser !== undefined}
          screenshotId={_id}
          isFavorited={isFavorited}
          favoritesCount={favoritesCount}
        />
        <DownloadButton dispatch={dispatch} screenshotId={_id} file={file} />

        {(isOwner || isAdmin) &&
          <DeleteButton
            dispatch={dispatch}
            screenshotId={_id}
            onDelete={browserHistory.goBack}
          />}
      </Button.Group>
    )
  }
}

ScreenshotPage.propTypes = propTypes

export default ScreenshotPage
