import React, { Component, PropTypes } from 'react'
import Zooming from 'zooming'

class ScreenshotList extends Component {

  componentDidUpdate () {
    console.log('ScreenshotList did mount')

    const { quantity, numRendered } = this.props

    if (quantity === numRendered) {
      console.log('All screenshots rendered!')
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
