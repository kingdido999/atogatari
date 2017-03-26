import React, { Component, PropTypes } from 'react'
import { Container, Form, Image, Header, Input, Label, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Zooming from 'zooming'
import { trimEnd } from 'lodash'

import { upload } from '../actions/user'

class Upload extends Component {

  state = {
    file: null,
    imagePreviewUrl: '',
    bangumiTitle: '',
    episodeIndex: 1,
    tagsValue: '',
    tags: [],
    zooming: new Zooming()
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleTagEnter = (event, data) => {
    const { value } = data
    this.setState({
      tagsValue: value
    })
    const len = value.length
    if (len < 3 || value.trim() === '') return

    if (value.charAt(len - 1) === ' ' && value.charAt(len - 2) === ' ') {
      this.setState({
        tagsValue: '',
        tags: [ ...this.state.tags, trimEnd(value).toLowerCase() ]
      })
    }
  }

  handleTagDelete = (tagToDelete) => {
    this.setState({
      tags: this.state.tags.filter(tag => tag !== tagToDelete)
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

  handleSubmit = (event) => {
    event.preventDefault()

    const { dispatch } = this.props
    const data = new FormData()
    data.append('file', this.state.file)
    data.append('bangumiTitle', this.state.bangumiTitle)
    data.append('episodeIndex', this.state.episodeIndex)
    data.append('tags', JSON.stringify(this.state.tags))
    dispatch(upload(data))
    .then(() => browserHistory.push('/'))
  }

  render() {
    let { imagePreviewUrl, file, bangumiTitle, episodeIndex, tags } = this.state
    const { isUploading } = this.props
    const size = 'large'

    return (
      <Container text>
        <Header>Upload You Screenshot!</Header>

        <br/>

        <Form onSubmit={this.handleSubmit} loading={isUploading} size={size}>

          <Form.Field>
            <label>Screenshot</label>
            <input type="file" onChange={this.handleImageChange} />
          </Form.Field>

          {imagePreviewUrl &&
            <Form.Field>
              <Image src={imagePreviewUrl} className="img-preview" />
            </Form.Field>
          }

          <Form.Field>
            <label>Bangumi Title</label>
            <input type="text" name="bangumiTitle" onChange={this.handleInputChange} />
          </Form.Field>

          <Form.Field>
            <label>Episode</label>
            <input type="number" min="0" step="1" name="episodeIndex" onChange={this.handleInputChange} />
          </Form.Field>

          <Form.Field>
            <label>Tags</label>

            <Label.Group>
              {tags.map((tag, index) =>
                <Label key={index}>
                  {tag}
                  <Icon name='delete' onClick={(event) => { this.handleTagDelete(tag) }} />
                </Label>
              )}
            </Label.Group>

            <Input
              icon='tags'
              iconPosition='left'
              placeholder='Hit SPACE twice to add a tag'
              value={this.state.tagsValue}
              onChange={this.handleTagEnter}
            />
          </Form.Field>

          <Form.Button
            type="submit"
            size={size}
            primary
            fluid
            disabled={
              !this.state.file
              || !this.state.bangumiTitle
              || !this.state.episodeIndex
            }
          >
            Submit
          </Form.Button>
        </Form>
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
  const { upload } = user
  const { isUploading } = upload

  return {
    isUploading
  }
}

export default connect(mapStateToProps)(Upload)
