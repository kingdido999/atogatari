import React, { Component, PropTypes } from 'react'
import { Image } from 'semantic-ui-react'
import { screenshotRendered } from '../actions/screenshot'

class ScreenshotItem extends Component {

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
      <Image
        src={thumbnailUrl}
        data-original={originalUrl}
        className="screenshot"
        alt=""
      />
    )
  }
}

function isFullUrl (url) {
  return url.includes('http')
}

ScreenshotItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  thumbnail_filename: PropTypes.string.isRequired,
  original_filename: PropTypes.string.isRequired
}

export default ScreenshotItem
