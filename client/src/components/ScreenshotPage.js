import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import {
  Container,
  Segment,
  Grid,
  Button,
  Label,
  Header
} from 'semantic-ui-react'
import Zooming from 'zooming'
import moment from 'moment'

import Tag from '../components/Tag'
import AddTagDropdown from '../components/AddTagDropdown'
import ZoomableImage from '../components/ZoomableImage'
import DownloadButton from '../components/DownloadButton'
import FavoriteButton from '../components/FavoriteButton'
import WhatAnimeGaButton from '../components/WhatAnimeGaButton'
import DeleteButton from '../components/DeleteButton'

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
    const { dispatch, authedUser, isAdmin, screenshot, tags } = this.props
    if (!screenshot) return null

    return (
      <div>
        {screenshot.tags.length > 0 &&
          <Label.Group>
            {screenshot.tags.map((name, index) => (
              <Tag
                key={index}
                type={tags[name] ? tags[name].type : 'General'}
                name={name}
                count={tags[name] ? tags[name].screenshots.length : null}
                dispatch={dispatch}
                isAdmin={isAdmin}
                screenshotId={screenshot._id}
              />
            ))}
          </Label.Group>}

        {screenshot.tags.length > 0 && authedUser && <br />}

        {authedUser &&
          <AddTagDropdown dispatch={dispatch} screenshotId={screenshot._id} />}
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
          authedUser={authedUser}
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
