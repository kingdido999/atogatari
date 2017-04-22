import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import {
  Container,
  Segment,
  Grid,
  Button,
  Dropdown,
  Label,
  Header
} from 'semantic-ui-react'
import { uniqBy, union } from 'lodash'
import Zooming from 'zooming'
import moment from 'moment'

import Tag from '../components/Tag'
import ZoomableImage from '../components/ZoomableImage'
import DownloadButton from '../components/DownloadButton'
import FavoriteButton from '../components/FavoriteButton'
import WhatAnimeGaButton from '../components/WhatAnimeGaButton'
import DeleteButton from '../components/DeleteButton'

import { search } from '../actions/entities'
import { addTag } from '../actions/user'
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
  state = {
    tag: '',
    tagSuggestions: []
  }

  render() {
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
                {this.renderWhatanimegaSegment()}
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
    const zooming = new Zooming({
      bgColor: '#000'
    })

    return (
      <Segment color={nsfw ? 'yellow' : null}>
        <ZoomableImage
          id={_id}
          src={getImageUrl(file.medium)}
          dataOriginal={getImageUrl(file.large)}
          zooming={zooming}
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
        <Header size="small">
          <Link to={`/user/${uploader._id}`}>{uploader.username}</Link>
          <Header.Subheader>
            {moment(screenshot.createdAt).fromNow()}
          </Header.Subheader>
        </Header>
      </Segment>
    )
  }

  renderTagsSegment = () => {
    const { dispatch, isAdmin, screenshot, tags } = this.props
    if (!screenshot || screenshot.tags.length === 0) return null

    return (
      <Segment>
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
        </Label.Group>
      </Segment>
    )
  }

  renderAddTagSegment = () => {
    const { authedUser, tag } = this.props
    if (!authedUser) return null

    return (
      <Segment>
        <Dropdown
          options={this.state.tagSuggestions}
          placeholder="Enter a new tag"
          additionLabel=""
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

  renderWhatanimegaSegment = () => {
    const { screenshot } = this.props
    if (!screenshot) return null
    const { file } = screenshot

    return (
      <Segment>
        <WhatAnimeGaButton url={getImageUrl(file.medium)} />
      </Segment>
    )
  }

  renderActionSegment = () => {
    const { dispatch, isOwner, isAdmin, authedUser, screenshot } = this.props
    if (!screenshot) return null
    const { _id, file, favorites } = screenshot

    const isFavorited = authedUser
      ? authedUser.favorites.find(id => favorites.includes(id)) !== undefined
      : false

    const favoritesCount = favorites.length

    return (
      <Segment>
        <Button.Group size="large" fluid>
          <FavoriteButton
            dispatch={dispatch}
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
      </Segment>
    )
  }

  handleSearchChange = (event, value) => {
    const { dispatch } = this.props

    dispatch(search({ query: value })).then(res => {
      const { value } = res
      const { data } = value
      const newSuggestions = data.map(({ name }) => {
        return { text: name, value: name }
      })

      this.setState({
        tagSuggestions: uniqBy(
          union(this.state.tagSuggestions, newSuggestions),
          'text'
        )
      })
    })
  }

  handleChange = (e, { value }) => {
    this.setState({ tag: value })

    const { dispatch, screenshot } = this.props
    dispatch(addTag(value, screenshot._id)).then(() =>
      this.setState({ tag: '', tagSuggestions: [] })
    )
  }
}

ScreenshotPage.propTypes = propTypes

export default ScreenshotPage
