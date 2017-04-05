import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Container, Segment, Grid, Button, Form, Input, Label } from 'semantic-ui-react'
import Zooming from 'zooming'

import Tag from '../components/Tag'
import ZoomableImage from '../components/ZoomableImage'
import DownloadButton from '../components/buttons/DownloadButton'
import FavoriteButton from '../components/buttons/FavoriteButton'
import WhatAnimeGaButton from '../components/buttons/WhatAnimeGaButton'
import DeleteButton from '../components/buttons/DeleteButton'

import { getScreenshotIfNeeded } from '../actions/entities'
import { addTag } from '../actions/user'
import { getImageUrl } from '../utils'

class Screenshot extends Component {

  state = {
    tag: ''
  }

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
            <Grid.Column width={12}>
              {this.renderImage()}
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment.Group>
                {this.renderUploaderSegment()}
                {this.renderTagsSegment()}
                {this.renderActionSegment()}
              </Segment.Group>

              <Segment.Group>
                {this.renderAddTagSegment()}
              </Segment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }

  renderUploaderSegment = () => {
    const { users, screenshot } = this.props
    if (!screenshot) return null

    const uploader = users[screenshot.user]
    if (!uploader) return null

    return (
      <Segment>
        Uploaded by <Link to={`/user/${uploader._id}`}>{uploader.username}</Link>
      </Segment>
    )
  }

  renderTagsSegment = () => {
    const { dispatch, isAdmin, screenshot, screenshotTags } = this.props
    if (!screenshotTags || screenshotTags.names.length === 0) return null

    return (
      <Segment>
        <Label.Group>
          {screenshotTags.names.map((tag, index) =>
            <Tag 
              key={index}
              tag={tag}
              dispatch={dispatch}
              isAdmin={isAdmin}
              screenshotId={screenshot._id}
            />
          )}
        </Label.Group>
      </Segment>
    )
  }

  renderAddTagSegment = () => {
    const { isAuthenticated } = this.props
    if (!isAuthenticated) return null

    return (
      <Segment>
        <Form onSubmit={this.handleAddTag}>
          <Input
            fluid
            transparent
            icon='tag'
            iconPosition='left'
            name='tag'
            value={this.state.tag}
            placeholder='Enter a new tag'
            onChange={this.handleInputChange}
          />
        </Form>
      </Segment>
    )
  }

  renderActionSegment = () => {
    const { dispatch, isAuthenticated, isOwner, isAdmin, screenshot, screenshotFavorites, userFavorites } = this.props
    if (!screenshot || !screenshotFavorites) return null
    const { _id, file } = screenshot

    const isFavorited = isAuthenticated && userFavorites
    ? userFavorites.ids.find(favoriteId => {
        return screenshotFavorites.ids.includes(favoriteId)
      }) !== undefined
    : false

    const favoritesCount = screenshotFavorites.ids.length

    return (
      <Segment>
        <Button.Group size='large' fluid>
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
          <WhatAnimeGaButton url={getImageUrl(file.medium)} />

          {isAuthenticated && (isOwner || isAdmin) &&
            <DeleteButton dispatch={dispatch} screenshotId={_id} />
          }
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

  handleInputChange = (event) => {
    const target = event.target
    const { value, name } = target

    this.setState({
      [name]: value
    })
  }

  handleAddTag = (event) => {
    event.preventDefault()
    const { dispatch, screenshot } = this.props
    dispatch(addTag(this.state.tag, screenshot._id))
    .then(() => this.setState({ tag: '' }))
  }
}

Screenshot.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  screenshot: PropTypes.object,
  users: PropTypes.object.isRequired,
  bangumis: PropTypes.object.isRequired,
  screenshotFavorites: PropTypes.object,
  screenshotTags: PropTypes.object,
  userFavorites: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  const { entities, user, screenshotFavorites, screenshotTags, userFavorites } = state
  const { users, bangumis, screenshots } = entities
  const { isAuthenticated, uid } = user
  const { screenshotId } = ownProps.params
  const screenshot = screenshots[screenshotId]
  const authedUser = users[uid]   
  const isOwner = uid === user
  const isAdmin = authedUser && authedUser.roles && authedUser.roles.includes('admin')

  return {
    isAuthenticated,
    uid,
    isOwner,
    isAdmin,
    screenshot,
    users,
    bangumis,
    screenshotFavorites: screenshotFavorites[screenshotId],
    screenshotTags: screenshotTags[screenshotId],
    userFavorites: userFavorites[uid]
  }
}

export default connect(mapStateToProps)(Screenshot)
