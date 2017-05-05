import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import { Container, Segment, Grid, Button, Header } from 'semantic-ui-react'
import moment from 'moment'
import Zooming from 'zooming'

import Tags from './Tags'
import AddTagDropdown from './AddTagDropdown'
import NSFWCheckbox from './NSFWCheckbox'
import ZoomableImage from './ZoomableImage'
import DownloadButton from './DownloadButton'
import FavoriteButton from './FavoriteButton'
import WhatAnimeGaIconButton from './WhatAnimeGaIconButton'
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
              {this.renderImage()}
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment.Group>
                <Segment>{this.renderUploader()}</Segment>
                <Segment>{this.renderTags()}</Segment>
                <Segment>{this.renderNSFW()}</Segment>
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
    const zooming = new Zooming({
      bgColor: '#000'
    })

    return (
      <ZoomableImage
        id={_id}
        src={getImageUrl(file.medium)}
        dataOriginal={getImageUrl(file.large)}
        zooming={zooming}
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
        {screenshot.tags.length > 0 &&
          <Tags
            {...this.props}
            tagNames={screenshot.tags}
            screenshotId={screenshot._id}
            deletable={true}
          />}

        <AddTagDropdown
          dispatch={dispatch}
          screenshotId={screenshot._id}
          fluid={true}
          disabled={!authedUser}
        />
      </div>
    )
  }

  renderNSFW = () => {
    const { dispatch, authedUser, screenshot } = this.props
    if (!screenshot) return null
    const { _id, nsfw } = screenshot

    return (
      <NSFWCheckbox
        dispatch={dispatch}
        isAuthenticated={authedUser !== undefined}
        screenshotId={_id}
        nsfw={nsfw}
      />
    )
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
        <WhatAnimeGaIconButton url={getImageUrl(file.small)} />

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
