import React, { Component } from 'react'

import ScreenshotCards from '../components/ScreenshotCards'
import { getUploadedScreenshotsIfNeeded } from '../actions/user'

class UserUploads extends Component {

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(getUploadedScreenshotsIfNeeded())
  }

  render() {
    const { userScreenshots } = this.props

    return (
      <ScreenshotCards
        screenshotIds={userScreenshots.ids}
        { ...this.props }
      />
    )
  }
}

export default UserUploads
