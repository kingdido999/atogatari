import React, { Component, PropTypes } from 'react'
import { Container, Segment, Form, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Zooming from 'zooming'

import { upload } from '../actions/authed'

class Upload extends Component {

  state = {
    file: null,
    imagePreviewUrl: '',
    bangumiTitle: '',
    episodeIndex: 0,
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

    dispatch(upload(data))
    .then(() => browserHistory.push('/'))
  }

  render() {
    let { imagePreviewUrl } = this.state
    const { isUploading } = this.props

    return (
      <Container text>
        <Segment basic loading={isUploading}>
          <Form onSubmit={this.handleSubmit}>

            <Form.Field>
              <label>File</label>
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

            <Form.Button type="submit" disabled={!this.state.file} primary>Submit</Form.Button>
          </Form>
        </Segment>
      </Container>
    )
  }
}

Upload.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { authed } = state
  const { upload } = authed
  const { isUploading } = upload

  return {
    isUploading
  }
}

export default connect(mapStateToProps)(Upload)
