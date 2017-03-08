import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

import ScreenshotCard from '../components/ScreenshotCard'

class UserUploads extends Component {

  render() {
    const { dispatch, favorites, screenshots, zooming, isAuthenticated } = this.props

    return (
      <Card.Group>
        {screenshots.map(screenshot =>
          <ScreenshotCard
            dispatch={dispatch}
            key={screenshot._id}
            screenshot={screenshot}
            zooming={zooming}
            favorites={favorites}
            isAuthenticated={isAuthenticated}
          />
        )}
      </Card.Group>
    )
  }
}

export default UserUploads
