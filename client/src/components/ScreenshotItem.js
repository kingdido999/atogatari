import React, { Component, PropTypes } from 'react'
import { Image } from 'semantic-ui-react'

import { getScreenshotUrl } from '../utils'

class ScreenshotItem extends Component {

  componentDidMount () {
    const { id, zooming } = this.props
    const image = document.getElementById(id)
    zooming.listen(image)
  }

  render () {
    const { id, thumbnail_filename, original_filename } = this.props
    const thumbnailUrl = getScreenshotUrl(thumbnail_filename)
    const originalUrl = getScreenshotUrl(original_filename)

    return (
      <Image
        id={id}
        src={thumbnailUrl}
        data-original={originalUrl}
        className="screenshot"
        alt=""
      />
    )
  }
}

ScreenshotItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  thumbnail_filename: PropTypes.string.isRequired,
  original_filename: PropTypes.string.isRequired
}

export default ScreenshotItem
