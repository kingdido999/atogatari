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
  }

  render() {
    const { id, src, dataOriginal } = this.props

    return (
      <Image
        fluid
        id={id}
        src={src}
        data-original={dataOriginal}
        alt="screenshot"
      />
    )
  }
}

ZoomableImage.propTypes = propTypes

export default ZoomableImage
