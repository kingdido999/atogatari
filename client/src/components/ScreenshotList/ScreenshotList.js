import React, { Component, PropTypes } from 'react'
import Zooming from 'zooming'

class ScreenshotList extends Component {

  componentDidUpdate () {
    const { quantity, numRendered } = this.props

    if (quantity === numRendered) {
      new Zooming({
        defaultZoomable: '.screenshot'
      })
    }
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

ScreenshotList.propTypes = {
  quantity: PropTypes.number.isRequired,
  numRendered: PropTypes.number.isRequired
}

export default ScreenshotList
