import React, { Component, PropTypes } from 'react'
import { Container, Segment, Header, Message, Form, Image, Label, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { uniqBy, union } from 'lodash'
import Zooming from 'zooming'

import { upload } from '../actions/user'
import { search } from '../actions/entities'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired
}

class UploadContainer extends Component {

  state = {
    file: null,
    imagePreviewUrl: '',
    tagSuggestions: [],
    tags: [],
    nsfw: false,
    zooming: new Zooming()
  }

  handleInputChange = (event, { value }) => {

    this.setState({
      tags: value
    })
  }

  handleSearchChange = (event, value) => {
    const { dispatch } = this.props


    dispatch(search({ query: value }))
    .then(res => {
      const { value } = res
      const { data } = value
      const newSuggestions = data.map(({ name }) => {
        return { text: name, value: name }
      })

      this.setState({
        tagSuggestions: uniqBy(union(this.state.tagSuggestions, newSuggestions), 'text')
      })
    })
  }

  handleAddTag = (event, { value }) => {
    this.setState({
      tagSuggestions: uniqBy([ { text: value, value }, ...this.state.tagSuggestions ], 'text')
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
    const { file, tags, nsfw } = this.state

    const data = new FormData()
    data.append('file', file)
    data.append('tags', JSON.stringify(tags))
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
      <Message info>
        <Message.List>
          <Message.Item>ANIME screenshot only.</Message.Item>
          <Message.Item>Image width has to be at least 1920px.</Message.Item>
        </Message.List>
      </Message>
    )
  }

  renderPreview = () => {
    const { file, imagePreviewUrl } = this.state
    if (!file) return null

    return (
      <Card fluid>
        <Image
          src={imagePreviewUrl}
          className="img-preview"
        />
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
    const { file, tags, tagSuggestions } = this.state
    if (!file) return null

    return (
      <Form.Dropdown
        options={tagSuggestions}
        placeholder='Enter tags'
        additionLabel=''
        icon={null}
        search
        selection
        fluid
        multiple
        allowAdditions
        selectOnBlur={false}
        noResultsMessage={'Type to show suggestions...'}
        name='tags'
        value={tags}
        onAddItem={this.handleAddTag}
        onChange={this.handleInputChange}
        onSearchChange={this.handleSearchChange}
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
      />
    )
  }

  renderButtonSubmit = () => {
    const { file } = this.state
    if (!file) return null

    return (
      <Form.Button type="submit" primary>Submit</Form.Button>
    )
  }

  renderTagLabels = () => {
    const { tags } = this.state

    return (
      <Label.Group>
        {tags.map((tag, index) =>
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
        <Segment>
          <Header>Screenshot Upload</Header>
          {this.renderMessage()}
          {this.renderPreview()} 
          {this.renderForm()}
        </Segment>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state
  const { isUploading } = user

  return {
    isUploading
  }
}

UploadContainer.propTypes = propTypes

export default connect(mapStateToProps)(UploadContainer)
