import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { upload } from '../actions/file'

import './Upload.css'

class Upload extends Component {

  constructor(props) {
    super(props)
    this.state = {
      file: null,
      imagePreviewUrl: ''
    }
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
    }

    reader.readAsDataURL(file)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData()
    data.append('file', this.state.file)
    this.props.dispatch(upload(data))
  }

  render() {
    const { errorMessage } = this.props
    let { imagePreviewUrl } = this.state

    return (
      <section className="container">
        {imagePreviewUrl &&
          <div className="imgPreview">
            <img src={imagePreviewUrl} className="img-preview" alt="preview" />
          </div>
        }

        <form>
          {errorMessage &&
          <p>{errorMessage}</p>
          }

          <input className="u-full-width" type="file" onChange={this.handleImageChange} />

          <label htmlFor="bangumi">Bangumi</label>
          <input type="text" name="bangumi" className="u-full-width" onChange={this.handleInputChange} />

          <label htmlFor="episode">Episode</label>
          <input type="number" step="1" min="0" name="episode" className="u-full-width" onChange={this.handleInputChange} />

          {this.state.file &&
            <input className="button-primary" type="submit" value="Submit" onClick={this.handleSubmit} />
          }
        </form>
      </section>
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
