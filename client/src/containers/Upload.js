import React, { Component, PropTypes } from 'react'
import { Container, Grid, Form, Image, Label, Segment, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Zooming from 'zooming'
import { trimStart, trimEnd, uniq } from 'lodash'

import { upload } from '../actions/user'
import { separator } from '../utils'

class Upload extends Component {

  state = {
    file: null,
    imagePreviewUrl: '',
    bangumiTitle: '',
    episode: '',
    aliases: '',
    tags: '',
    aliasesList: [],
    tagsList: [],
    nsfw: false,
    zooming: new Zooming()
  }

  handleInputChange = (event) => {
    const { target } = event
    const { value, name } = target

    this.setState({
      [name]: value
    }, () => {
      if (name === 'tags' || name === 'aliases') {
        this.setState({
          [`${name}List`]: uniq(this.state[name]
            .split(separator([' ', ',', '，']))
            .map(item => trimStart(trimEnd(item)))
            .filter(item => item !== ''))
        })
      }
    })
  }

  handleImageChange = (e) => {
    e.preventDefault()

    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      })

      this.state.zooming.listen('.img-preview')
    }

    reader.readAsDataURL(file)
  }

  handleInputToggle = (event, data) => {
    const { name, checked } = data

    this.setState({
      [name]: checked
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { dispatch } = this.props
    const { file, bangumiTitle, episode, aliasesList, tagsList, nsfw } = this.state

    const data = new FormData()
    data.append('file', file)
    data.append('bangumiTitle', bangumiTitle)
    data.append('episode', episode)
    data.append('aliases', JSON.stringify(aliasesList))
    data.append('tags', JSON.stringify(tagsList))
    data.append('nsfw', nsfw)

    dispatch(upload(data))
    .then(() => browserHistory.goBack())
  }

  renderForm = () => {
    const { isUploading } = this.props
    const size = 'large'

    return (
      <Form onSubmit={this.handleSubmit} loading={isUploading} size={size}>

        <Segment.Group size={size}>
          <Segment>
            <p>Just a few simple rules:</p>

            <ul>
              <li>It is an ANIME Screenshot.</li>
              <li>Image width is at least 1920px.</li>
            </ul>
          </Segment>

          <Segment>
            <Form.Input
              type="file"
              label="Screenshot"
              onChange={this.handleImageChange}
              required
            />

            <Form.Group widths='equal'>
              <Form.Input
                label="What is the official name of this anime?"
                name="bangumiTitle"
                onChange={this.handleInputChange}
                placeholder="らき☆すた"
                required
              />

              <Form.Input
                label='I call this anime:'
                icon='talk outline'
                name="aliases"
                value={this.state.aliases}
                onChange={this.handleInputChange}
                placeholder="Lucky Star, 幸运星"
              />
            </Form.Group>

            <Form.Group widths='equal'>
              <Form.Input
                label='Episode'
                name="episode"
                type="number"
                min="0"
                step="1"
                value={this.state.episode}
                onChange={this.handleInputChange}
                required
              />

              <Form.Input
                label='Tags'
                icon='tags'
                name='tags'
                value={this.state.tags}
                onChange={this.handleInputChange}
                placeholder='Konata, こなた'
              />
            </Form.Group>

            <Form.Group widths='equal'>
              <Form.Checkbox
                label='NSFW (Not Safe For Work)'
                name='nsfw'
                onChange={this.handleInputToggle}
                toggle
              />
              <Form.Button type="submit" size={size} primary fluid>Submit</Form.Button>
            </Form.Group>

          </Segment>
        </Segment.Group>

      </Form>
    )
  }

  renderPreview = () => {
    const { imagePreviewUrl, bangumiTitle, episode } = this.state
    const previewSrc = imagePreviewUrl || 'http://placehold.it/640x360?text=Replace+me!'
    const previewTitle = bangumiTitle || 'らき☆すた'
    const previewEpisode = episode || '??'

    return (
      <Card fluid>
        <Image
          src={previewSrc}
          className="img-preview"
        />

        <Card.Content>
          <Card.Header>
            {previewTitle}
          </Card.Header>
          <Card.Meta>
            Ep. {previewEpisode}
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Card.Meta>Aliases</Card.Meta>
          <Card.Description>
            {this.renderAliasLabels()}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Card.Meta>Tags</Card.Meta>
          <Card.Description>
            {this.renderTagLabels()}
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }

  renderAliasLabels = () => {
    const { aliasesList } = this.state

    return (
      <Label.Group>
        {aliasesList.map((alias, index) =>
          <Label key={index}>
            {alias}
          </Label>
        )}
      </Label.Group>
    )
  }

  renderTagLabels = () => {
    const { tagsList } = this.state

    return (
      <Label.Group>
        {tagsList.map((tag, index) =>
          <Label key={index}>
            {tag}
          </Label>
        )}
      </Label.Group>
    )
  }

  render() {
    return (
      <Container>
        <Grid stackable>
          <Grid.Row columns={2}>
            <Grid.Column width={10}>
              {this.renderForm()}
            </Grid.Column>
            <Grid.Column width={6}>
              {this.renderPreview()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

Upload.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { user } = state
  const { isUploading } = user

  return {
    isUploading
  }
}

export default connect(mapStateToProps)(Upload)
