import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

import ScreenshotCard from '../components/ScreenshotCard'

import { getUploadedScreenshots } from '../actions/authed'

class UserUploads extends Component {

  componentWillMount () {
    const { dispatch } = this.props
    const token = localStorage.getItem('token')

    dispatch(getUploadedScreenshots({
      token: token
    }))
  }

  render() {
    const { dispatch, screenshots, zooming, isAuthenticated } = this.props

    return (
      <Card.Group>
        {screenshots.map((screenshot, index) =>
          <ScreenshotCard
            dispatch={dispatch}
            key={index}
            screenshot={screenshot}
            zooming={zooming}
            isAuthenticated={isAuthenticated}
          />
        )}
      </Card.Group>
    )
  }
}

export default UserUploads
