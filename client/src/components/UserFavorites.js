import React, { Component, PropTypes } from 'react'
import { Card } from 'semantic-ui-react'
import Zooming from 'zooming'

import ScreenshotCard from '../components/ScreenshotCard'

class UserFavorites extends Component {

  render() {
    const { dispatch, favorites, isAuthenticated } = this.props
    const zooming = new Zooming()

    return (
      <Card.Group>
        {favorites.map(favorite =>
          <ScreenshotCard
            dispatch={dispatch}
            key={favorite.screenshot._id}
            screenshot={favorite.screenshot}
            zooming={zooming}
            favorites={favorites}
            isAuthenticated={isAuthenticated}
          />
        )}
      </Card.Group>
    )
  }
}

UserFavorites.propTypes = {
  dispatch: PropTypes.func,
  favorites: PropTypes.array,
  isAuthenticated: PropTypes.bool
}

export default UserFavorites
