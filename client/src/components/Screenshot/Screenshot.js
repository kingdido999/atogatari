import React, { Component, PropTypes } from 'react'
import { Image } from 'semantic-ui-react'
import { screenshotRendered } from '../../actions/screenshot'

import './screenshot.css'

class Screenshot extends Component {

  componentDidMount () {
    this.props.dispatch(screenshotRendered())
  }

  render () {
    const { thumbnail_filename, original_filename } = this.props
    const path = 'http://localhost:3001/screenshots'
    const thumbnailUrl = isFullUrl(thumbnail_filename)
      ? thumbnail_filename
      : `${path}/${thumbnail_filename}`

    const originalUrl = isFullUrl(original_filename)
      ? original_filename
      : `${path}/${original_filename}`

    return (
      <figure>
        <Image
          src={thumbnailUrl}
          data-original={originalUrl}
          className="screenshot"
          alt=""
        />
      </figure>

    )
  }
}

function isFullUrl (url) {
  return url.includes('http')
}

Screenshot.propTypes = {
  thumbnail_filename: PropTypes.string.isRequired,
  original_filename: PropTypes.string.isRequired
}

export default Screenshot
