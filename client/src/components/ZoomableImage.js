import React, { Component, PropTypes } from 'react'
import { Image } from 'semantic-ui-react'

class ZoomableImage extends Component {

  componentDidMount () {
    const { id, zooming } = this.props
    const image = document.getElementById(id)
    zooming.listen(image)
  }

  render () {
    const { id, src, dataOriginal } = this.props

    return (
      <Image
        centered
        id={id}
        src={src}
        data-original={dataOriginal}
        className="screenshot"
        alt="screenshot"
      />
    )
  }
}

ZoomableImage.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  dataOriginal: PropTypes.string,
  zooming: PropTypes.object.isRequired,
}

export default ZoomableImage
