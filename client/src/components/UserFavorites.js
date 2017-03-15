import React, { Component, PropTypes } from 'react'
import { Card } from 'semantic-ui-react'

import ScreenshotCard from '../components/ScreenshotCard'

class UserFavorites extends Component {

  render() {
    const { dispatch, isAuthenticated, allScreenshots, allFavorites, userFavorites, zooming } = this.props
    const favoriteScreenshotIds = userFavorites.allIds.map(favoriteId => {
      return userFavorites.byId[favoriteId].screenshot
    })

    return (
      <Card.Group>
        {favoriteScreenshotIds.map(id =>
          <ScreenshotCard
            key={id}
            dispatch={dispatch}
            isAuthenticated={isAuthenticated}
            zooming={zooming}
            screenshot={allScreenshots.byId[id]}
            allFavorites={allFavorites}
            userFavorites={userFavorites}
          />
        )}
      </Card.Group>
    )
  }
}

UserFavorites.propTypes = {
  dispatch: PropTypes.func,
  allScreenshots: PropTypes.object,
  zooming: PropTypes.object,
  isAuthenticated: PropTypes.bool
}

export default UserFavorites
