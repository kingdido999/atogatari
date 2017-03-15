import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

import ScreenshotCard from '../components/ScreenshotCard'
import { getUploadedScreenshots } from '../actions/authed'

class UserUploads extends Component {

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(getUploadedScreenshots())
  }

  render() {
    const { dispatch, userScreenshots, allFavorites, userFavorites, zooming, isAuthenticated } = this.props

    return (
      <Card.Group>
        {userScreenshots.allIds.map(id =>
          <ScreenshotCard
            dispatch={dispatch}
            key={id}
            screenshot={userScreenshots.byId[id]}
            zooming={zooming}
            isAuthenticated={isAuthenticated}
            allFavorites={allFavorites}
            userFavorites={userFavorites}
          />
        )}
      </Card.Group>
    )
  }
}

export default UserUploads
