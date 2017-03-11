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
    const { id, path } = this.props
    const thumbnailUrl = getImageUrl(path.thumbnail)
    const originalUrl = getImageUrl(path.original)

    return (
      <Image
        id={id}
        src={thumbnailUrl}
        data-original={originalUrl}
        className="screenshot"
        alt="screenshot"
      />
    )
  }
}

ZoomableImage.propTypes = {
  id: PropTypes.string.isRequired,
  path: PropTypes.object.isRequired,
  zooming: PropTypes.object.isRequired,
}

export default ZoomableImage
