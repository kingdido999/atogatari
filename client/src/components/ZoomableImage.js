import React, { Component, PropTypes } from 'react'
import { Image } from 'semantic-ui-react'

const propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  dataOriginal: PropTypes.string,
  zooming: PropTypes.object.isRequired
}

class ZoomableImage extends Component {
  state = {
    loaded: false
  }

  componentDidMount() {
    const { id, zooming } = this.props
    const imgTag = document.getElementById(id)
    const imgSrc = imgTag.getAttribute('src')
    const img = new window.Image()
    img.onload = this.onImageLoad
    img.src = imgSrc
    zooming.listen(imgTag)
  }

  onImageLoad = () => {
    this.setState({ loaded: true })
  }

  render() {
    const { id, src, dataOriginal } = this.props
    const className = this.state.loaded ? 'lz-image-loaded' : 'lz-image'

    return (
      <Image
        fluid
        className={className}
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
