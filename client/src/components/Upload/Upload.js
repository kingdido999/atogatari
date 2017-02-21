import React, { Component, PropTypes } from 'react'
import { Message, Form, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { upload } from '../../actions/file'

import Zooming from 'zooming'

import './Upload.css'

class Upload extends Component {

  state = {
    file: null,
    imagePreviewUrl: '',
    bangumi_title: '',
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
    data.append('bangumi_title', this.state.bangumi_title)
    // data.append('episode', this.state.episode)
    this.props.dispatch(upload(data))
  }

  render() {
    const { errorMessage } = this.props
    let { imagePreviewUrl } = this.state

    return (
      <div>
        {imagePreviewUrl &&
          <Image src={imagePreviewUrl} className="img-preview" />
        }

        <Form onSubmit={this.handleSubmit}>
          {errorMessage &&
            <Message negative content={errorMessage} />
          }

          <Form.Field>
            <label>File</label>
            <input type="file" onChange={this.handleImageChange} />
          </Form.Field>

          <Form.Field>
            <label>Bangumi Title</label>
            <input type="text" name="bangumi_title" onChange={this.handleInputChange} />
          </Form.Field>

          <Form.Button type="submit" disabled={!this.state.file}>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

Upload.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {
  const { file } = state
  const { errorMessage } = file

  return {
    errorMessage
  }
}

export default connect(mapStateToProps)(Upload)
