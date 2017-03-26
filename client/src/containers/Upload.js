import React, { Component, PropTypes } from 'react'
import { Container, Form, Image, Label, Icon, Segment } from 'semantic-ui-react'
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
    episode: '',
    alias: '',
    tag: '',
    aliasList: [],
    tagList: [],
    zooming: new Zooming()
  }

  handleInputChange = (event) => {
    const { target } = event
    const { value, name } = target

    this.setState({
      [name]: value
    })

    if (name === 'tag' || name === 'alias') {
      const len = value.length
      if (len < 2 || value.trim() === '') return

      if (value.charAt(len - 1) === ' ' && value.charAt(len - 2) === ' ') {
        this.setState({
          [name]: '',
          [`${name}List`]: [ ...this.state[`${name}List`], trimEnd(value).toLowerCase() ]
        })
      }
    }
  }

  handleItemDelete = (name, itemToDelete) => {
    this.setState({
      [name]: this.state[name].filter(item => item !== itemToDelete)
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
    data.append('episode', this.state.episode)
    data.append('aliases', JSON.stringify(this.state.aliasList))
    data.append('tags', JSON.stringify(this.state.tagList))
    dispatch(upload(data))
    .then(() => browserHistory.push('/'))
  }

  renderAliasInput = () => {
    return (
      <Form.Input
        icon='talk outline'
        iconPosition='left'
        name="alias"
        value={this.state.alias}
        onChange={this.handleInputChange}
        placeholder="Lucky Star, 幸运星"
      />
    )
  }

  renderTagInput = () => {
    return (
      <Form.Input
        icon='tag'
        iconPosition='left'
        name='tag'
        value={this.state.tag}
        onChange={this.handleInputChange}
        placeholder='sailor, uniform'
      />
    )
  }

  render() {
    let { imagePreviewUrl, aliasList, tagList } = this.state
    const { isUploading } = this.props
    const size = 'large'

    return (
      <Container text>

        <Form onSubmit={this.handleSubmit} loading={isUploading} size={size}>

          {imagePreviewUrl &&
            <Form.Field>
              <Image src={imagePreviewUrl} className="img-preview" />
            </Form.Field>
          }

          <Form.Input
            icon="camera retro"
            label="Screenshot"
            type="file"
            onChange={this.handleImageChange}
            required
          />

          <Form.Group widths="equal">
            <Form.Input
              label="Official Bangumi Title"
              name="bangumiTitle"
              onChange={this.handleInputChange}
              placeholder="らき☆すた"
              required
            />

            <Form.Input
              label="Episode"
              name="episode"
              type="number"
              min="0"
              step="1"
              value={this.state.episode}
              onChange={this.handleInputChange}
              required
            />
          </Form.Group>

          <Segment basic textAlign='center' color='blue'>
            <Icon name='info' />
            Hit SPACE twice to add an alias or tag.
          </Segment>

          <Form.Group widths="equal">
            {this.renderAliasInput()}
            {this.renderTagInput()}
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field>
              <Label.Group>
                {aliasList.map((alias, index) =>
                  <Label key={index}>
                    {alias}
                    <Icon name='delete' onClick={(event) => { this.handleItemDelete('aliasList', alias) }} />
                  </Label>
                )}
              </Label.Group>
            </Form.Field>

            <Form.Field>
              <Label.Group>
                {tagList.map((tag, index) =>
                  <Label key={index}>
                    {tag}
                    <Icon name='delete' onClick={(event) => { this.handleItemDelete('tagList', tag) }} />
                  </Label>
                )}
              </Label.Group>
            </Form.Field>
          </Form.Group>



          <Form.Button type="submit" size={size} primary fluid>Submit</Form.Button>
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
