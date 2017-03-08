import React, { Component, PropTypes } from 'react'
import { Card } from 'semantic-ui-react'
import Zooming from 'zooming'

import { getFavorites } from '../actions/favorite'
import ScreenshotCard from '../components/ScreenshotCard'

class UserFavorites extends Component {

  componentWillMount () {
    const { dispatch } = this.props

    dispatch(getFavorites({
      token: localStorage.getItem('token')
    }))
  }

  render() {
    const { dispatch, isFetching, favorites, isAuthenticated } = this.props
    const zooming = new Zooming()

    if (isFetching) return null

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
  dispatch: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default UserFavorites
