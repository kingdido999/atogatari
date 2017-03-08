import React, { Component, PropTypes } from 'react'
import { Segment, Form, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { upload } from '../actions/file'

import Zooming from 'zooming'

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
    const data = new FormData()
    data.append('token', localStorage.getItem('token'))
    data.append('file', this.state.file)
    data.append('bangumiTitle', this.state.bangumiTitle)
    data.append('episodeIndex', this.state.episodeIndex)
    this.props.dispatch(upload(data))
  }

  render() {
    let { imagePreviewUrl } = this.state
    const { isUploading } = this.props

    return (
      <Segment basic loading={isUploading}>
        <Form onSubmit={this.handleSubmit}>

          <Form.Field>
            <label>File</label>
            <input type="file" onChange={this.handleImageChange} />
          </Form.Field>

          {imagePreviewUrl &&
            <Image src={imagePreviewUrl} className="img-preview" />
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
    )
  }
}

Upload.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { file } = state
  const { isUploading } = file

  return {
    isUploading
  }
}

export default connect(mapStateToProps)(Upload)
