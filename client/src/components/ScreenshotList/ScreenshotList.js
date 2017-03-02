import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'

class ScreenshotList extends Component {

  render () {
    return (
      <Image.Group>
        {this.props.children}
      </Image.Group>
    )
  }
}

export default ScreenshotList
