import React, { Component, PropTypes } from 'react'
import { Container, Form, Image, Label, Card } from 'semantic-ui-react'
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
    tags: '',
    tagList: [],
    nsfw: false,
    zooming: new Zooming()
  }

  handleInputChange = (event) => {
    const { target } = event
    const { value, name } = target

    this.setState({
      [name]: value
    }, () => {
      if (name === 'tags') {
        this.setState({
          tagList: uniq(this.state[name]
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
    .then(() => browserHistory.goBack())
  }

  renderForm = () => {
    const { imagePreviewUrl, tagList } = this.state
    const { isUploading } = this.props
    const size = 'large'

    return (
      <Card fluid>
        {imagePreviewUrl &&
          <Image
            src={imagePreviewUrl}
            className="img-preview"
          />
        }

        {tagList.length > 0 &&
          <Card.Content>
            <Card.Description>
              {this.renderTagLabels()}
            </Card.Description>
          </Card.Content>
        }

        <Card.Content>
          <Form onSubmit={this.handleSubmit} loading={isUploading} size={size}>

            <Form.Input
              type="file"
              onChange={this.handleImageChange}
              required
            />

            <Form.Input
              icon='tags'
              iconPosition='left'
              name='tags'
              value={this.state.tags}
              onChange={this.handleInputChange}
              placeholder='Separate tags by comma'
            />

            <Form.Checkbox
              label='NSFW (Not Safe For Work)'
              name='nsfw'
              onChange={this.handleInputToggle}
              toggle
            />

            <Form.Button type="submit" size={size} primary fluid>Submit</Form.Button>

          </Form>
        </Card.Content>
      </Card>
      
    )
  }

  renderPreview = () => {
    const { imagePreviewUrl } = this.state
    const previewSrc = imagePreviewUrl || 'https://placehold.it/640x360?text=Replace+me!'

    return (
      <Card fluid>
        <Image
          src={previewSrc}
          className="img-preview"
        />

        <Card.Content extra>
          <Card.Meta>Tags</Card.Meta>
          <Card.Description>
            {this.renderTagLabels()}
          </Card.Description>
        </Card.Content>
      </Card>
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
