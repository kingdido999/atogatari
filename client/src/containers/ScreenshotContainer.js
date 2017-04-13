import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Container, Segment, Grid, Button, Dropdown, Label, Header } from 'semantic-ui-react'
import { uniqBy, union } from 'lodash'
import Zooming from 'zooming'
import moment from 'moment'

import Tag from '../components/Tag'
import ZoomableImage from '../components/ZoomableImage'
import DownloadButton from '../components/buttons/DownloadButton'
import FavoriteButton from '../components/buttons/FavoriteButton'
import WhatAnimeGaButton from '../components/buttons/WhatAnimeGaButton'
import DeleteButton from '../components/buttons/DeleteButton'

import { getScreenshotIfNeeded } from '../actions/entities'
import { search } from '../actions/entities'
import { addTag } from '../actions/user'
import { getImageUrl } from '../utils'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  screenshot: PropTypes.object,
  users: PropTypes.object.isRequired,
  screenshotFavorites: PropTypes.object,
  screenshotTags: PropTypes.object,
  userFavorites: PropTypes.object
}

class ScreenshotContainer extends Component {

  state = {
    tag: '',
    tagSuggestions: []
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
              {this.renderImageSegment()}
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment.Group>
                {this.renderUploaderSegment()}
                {this.renderTagsSegment()}
                {this.renderAddTagSegment()}
                {this.renderActionSegment()}
              </Segment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }

  renderImageSegment = () => {
    const { screenshot } = this.props
    if (!screenshot) return null

    const { _id, file, nsfw } = screenshot

    return (
      <Segment color={nsfw ? 'yellow' : null}>
        <ZoomableImage
          id={_id}
          src={getImageUrl(file.medium)}
          dataOriginal={getImageUrl(file.large)}
          zooming={new Zooming()}
        />
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
        <Header size='small'>
          <Link to={`/user/${uploader._id}`}>{uploader.username}</Link>
          <Header.Subheader>
            {moment(screenshot.createdAt).fromNow()}
          </Header.Subheader>
        </Header>
      </Segment>
    )
  }

  renderTagsSegment = () => {
    const { dispatch, isAdmin, screenshot, screenshotTags } = this.props
    if (!screenshotTags || screenshotTags.names.length === 0) return null

    return (
      <Segment>
        <Label.Group>
          {screenshotTags.names.map((name, index) =>
            <Tag 
              key={index}
              color='teal'
              name={name}
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
    const { isAuthenticated, tag } = this.props
    if (!isAuthenticated) return null

    return (
      <Segment>
        <Dropdown
          options={this.state.tagSuggestions}
          placeholder='Enter a new tag'
          additionLabel=''
          icon={null}
          search
          selection
          fluid
          allowAdditions
          selectOnBlur={false}
          noResultsMessage={'Type to show suggestions...'}
          value={tag}
          onSearchChange={this.handleSearchChange}
          onChange={this.handleChange}
        />
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
            dispatch={dispatch}
            screenshotId={_id}
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


  handleSearchChange = (event, value) => {
    const { dispatch } = this.props

    dispatch(search({ query: value }))
    .then(res => {
      const { value } = res
      const { data } = value
      const newSuggestions = data
        .map(({ name }) => {
          return { text: name, value: name }
        })

      this.setState({
        tagSuggestions: uniqBy(union(this.state.tagSuggestions, newSuggestions), 'text')
      })
    })
  }

  handleChange = (e, { value }) => {
    this.setState({ tag: value })

    const { dispatch, screenshot } = this.props
    dispatch(addTag(value, screenshot._id))
    .then(() => this.setState({ tag: '', tagSuggestions: [] }))
  }
}

function mapStateToProps(state, ownProps) {
  const { entities, user, screenshotFavorites, screenshotTags, userFavorites } = state
  const { users, screenshots } = entities
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
    screenshotFavorites: screenshotFavorites[screenshotId],
    screenshotTags: screenshotTags[screenshotId],
    userFavorites: userFavorites[uid]
  }
}

ScreenshotContainer.propTypes = propTypes

export default connect(mapStateToProps)(ScreenshotContainer)
