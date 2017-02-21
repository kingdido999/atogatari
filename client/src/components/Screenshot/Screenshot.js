import React, { Component, PropTypes } from 'react'
import { screenshotRendered } from '../../actions/screenshot'

import './Screenshot.css'

class Screenshot extends Component {

  componentDidMount () {
    this.props.dispatch(screenshotRendered())
  }

  render () {
    const { thumbnail_filename, original_filename } = this.props
    const path = 'http://localhost:3001/screenshots'
    const thumbnailUrl = `${path}/${thumbnail_filename}`
    const originalUrl = `${path}/${original_filename}`

    return (
      <div>
        <img
          src={thumbnailUrl}
          data-original={originalUrl}
          className="screenshot"
          alt=""
        />
      </div>
    )
  }
}

Screenshot.propTypes = {
  thumbnail_filename: PropTypes.string.isRequired,
  original_filename: PropTypes.string.isRequired
}

export default Screenshot
