import React, { Component, PropTypes } from 'react'
import { Container, Message, Form, Image, Label, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { trimStart, trimEnd, uniq } from 'lodash'
import Zooming from 'zooming'

import { upload } from '../actions/user'
import { separator } from '../utils'

class Upload extends Component {

  state = {
    file: null,
    imagePreviewUrl: '',
    tags: '',
    tagList: [],
    nsfw: false,
    zooming: new Zooming()
  }

  handleInputChange = (event) => {
    const { target } = event
    const { value, name } = target

    this.setState({
      [name]: value.toLowerCase()
    }, () => {
      if (name === 'tags') {
        this.setState({
          tagList: uniq(this.state[name]
            .toLowerCase()
            .split(separator([',', '，']))
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
    const { file, tagList, nsfw } = this.state

    const data = new FormData()
    data.append('file', file)
    data.append('tags', JSON.stringify(tagList))
    data.append('nsfw', nsfw)

    dispatch(upload(data))
    .then(res => {
      browserHistory.push(`/screenshot/${res.value.data._id}`)
    })
  }

  renderMessage = () => {
    const { file } = this.state
    if (file) return null

    return (
      <Message>
        <Message.Header>A Few Simple Rules</Message.Header>
        <Message.List>
          <Message.Item>ANIME screenshot only.</Message.Item>
          <Message.Item>Image width has to be at least 1920px.</Message.Item>
        </Message.List>
      </Message>
    )
  }

  renderPreview = () => {
    const { file, imagePreviewUrl, tagList } = this.state
    if (!file) return null

    return (
      <Card fluid>
        <Image
          src={imagePreviewUrl}
          className="img-preview"
        />

        {tagList.length > 0 &&
          <Card.Content>
            <Card.Description>
              {this.renderTagLabels()}
            </Card.Description>
          </Card.Content>
        }
      </Card>
      
    )
  }

  renderForm = () => {
    const { isUploading } = this.props
    const size = 'large'

    return (
      <Form onSubmit={this.handleSubmit} loading={isUploading} size={size}>

        <Form.Input
          type="file"
          onChange={this.handleImageChange}
          required
        />

        {this.renderInputTags()}
        {this.renderCheckboxNSFW()}
        {this.renderButtonSubmit()}
      </Form>
    )
  }

  renderInputTags = () => {
    const { file, tags } = this.state
    if (!file) return null

    return (
      <Form.Input
        icon='tags'
        iconPosition='left'
        name='tags'
        value={tags}
        onChange={this.handleInputChange}
        placeholder='Separate tags by comma'
      />
    )
  }

  renderCheckboxNSFW = () => {
    const { file } = this.state
    if (!file) return null

    return (
      <Form.Checkbox
        label='NSFW (Not Safe For Work)'
        name='nsfw'
        onChange={this.handleInputToggle}
        toggle
      />
    )
  }

  renderButtonSubmit = () => {
    const { file } = this.state
    if (!file) return null

    return (
      <Form.Button type="submit" primary fluid>Submit</Form.Button>
    )
  }

  renderTagLabels = () => {
    const { tagList } = this.state

    return (
      <Label.Group>
        {tagList.map((tag, index) =>
          <Label key={index}>
            {tag}
          </Label>
        )}
      </Label.Group>
    )
  }

  render() {
    return (
      <Container text>
        {this.renderMessage()}
        {this.renderPreview()} 
        {this.renderForm()}
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
