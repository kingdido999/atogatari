import React, { Component, PropTypes } from 'react'

import ScreenshotCards from '../components/ScreenshotCards'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  authedUser: PropTypes.object,
  tags: PropTypes.object.isRequired,
  screenshots: PropTypes.object.isRequired,
  favorites: PropTypes.object.isRequired,
  screenshotIds: PropTypes.array.isRequired
}

class UserUploadsPage extends Component {
  render() {
    return <ScreenshotCards {...this.props} />
  }
}

UserUploadsPage.propTypes = propTypes

export default UserUploadsPage
