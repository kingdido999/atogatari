import React, { Component, PropTypes } from 'react'
import { Image } from 'semantic-ui-react'

import { getImageUrl } from '../utils'

class ZoomableImage extends Component {

  componentDidMount () {
    const { id, zooming } = this.props
    const image = document.getElementById(id)
    zooming.listen(image)
  }

  render () {
    const { id, thumbnail_filename, original_filename } = this.props
    const thumbnailUrl = getImageUrl(thumbnail_filename)
    const originalUrl = getImageUrl(original_filename)

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

ZoomableImage.propTypes = {
  id: PropTypes.string.isRequired,
  zooming: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  thumbnail_filename: PropTypes.string.isRequired,
  original_filename: PropTypes.string.isRequired
}

export default ZoomableImage
