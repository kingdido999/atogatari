import React, { Component, PropTypes } from 'react'
import Zooming from 'zooming'

import ScreenshotCards from '../components/ScreenshotCards'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  authedUser: PropTypes.object,
  tags: PropTypes.object.isRequired,
  screenshots: PropTypes.object.isRequired,
  favorites: PropTypes.object.isRequired,
  screenshotIds: PropTypes.array.isRequired
}

class UserUploadsPage extends Component {
  render() {
    const zooming = new Zooming({
      bgColor: '#000'
    })

    return <ScreenshotCards {...this.props} zooming={zooming} />
  }
}

UserUploadsPage.propTypes = propTypes

export default UserUploadsPage
