import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

import ScreenshotCard from '../components/ScreenshotCard'
import { getUploadedScreenshotsIfNeeded } from '../actions/user'

class UserUploads extends Component {

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(getUploadedScreenshotsIfNeeded())
  }

  render() {
    const { dispatch, isAuthenticated, screenshots, myScreenshots, myFavorites, screenshotFavorites, zooming } = this.props

    return (
      <Card.Group>
        {myScreenshots.ids.map(id =>
          <ScreenshotCard
            key={id}
            dispatch={dispatch}
            isAuthenticated={isAuthenticated}
            zooming={zooming}
            screenshot={screenshots[id]}
            myFavorites={myFavorites}
            screenshotFavorites={screenshotFavorites[id]}
          />
        )}
      </Card.Group>
    )
  }
}

export default UserUploads
