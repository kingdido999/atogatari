import React, { Component, PropTypes } from 'react'
import { Card } from 'semantic-ui-react'

import ScreenshotCard from '../components/ScreenshotCard'

class UserFavorites extends Component {

  render() {
    const { dispatch, favoriteScreenshots, zooming, isAuthenticated } = this.props

    return (
      <Card.Group>
        {favoriteScreenshots.map(screenshot =>
          <ScreenshotCard
            dispatch={dispatch}
            key={screenshot._id}
            screenshot={screenshot}
            zooming={zooming}
            isAuthenticated={isAuthenticated}
          />
        )}
      </Card.Group>
    )
  }
}

UserFavorites.propTypes = {
  dispatch: PropTypes.func,
  favoriteScreenshots: PropTypes.array,
  zooming: PropTypes.object,
  isAuthenticated: PropTypes.bool
}

export default UserFavorites
