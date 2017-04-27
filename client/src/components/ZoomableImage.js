import React, { Component, PropTypes } from 'react'
import { Image } from 'semantic-ui-react'

const propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  dataOriginal: PropTypes.string,
  zooming: PropTypes.object.isRequired
}

class ZoomableImage extends Component {
  componentDidMount() {
    const { id, zooming } = this.props
    const image = document.getElementById(id)
    image.setAttribute('src', image.getAttribute('data-src'))
    zooming.listen(image)
    image.onload = function() {
      image.removeAttribute('data-src')
    }
  }

  render() {
    const { id, src, dataOriginal } = this.props

    return (
      <Image
        fluid
        id={id}
        data-src={src}
        data-original={dataOriginal}
        alt="screenshot"
      />
    )
  }
}

ZoomableImage.propTypes = propTypes

export default ZoomableImage
