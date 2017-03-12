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
    const { id, file } = this.props
    const smallUrl = getImageUrl(file.small)
    const largeUrl = getImageUrl(file.large)

    return (
      <Image
        id={id}
        src={smallUrl}
        data-original={largeUrl}
        className="screenshot"
        alt="screenshot"
      />
    )
  }
}

ZoomableImage.propTypes = {
  id: PropTypes.string.isRequired,
  file: PropTypes.object.isRequired,
  zooming: PropTypes.object.isRequired,
}

export default ZoomableImage
