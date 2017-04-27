import React, { Component, PropTypes } from 'react'
import { Image } from 'semantic-ui-react'
import Zooming from 'zooming'

const propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  dataOriginal: PropTypes.string
}

class ZoomableImage extends Component {
  componentDidMount() {
    const { id } = this.props
    const image = document.getElementById(id)
    new Zooming({
      defaultZoomable: image,
      bgColor: '#000'
    })
    image.setAttribute('src', image.getAttribute('data-src'))
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
