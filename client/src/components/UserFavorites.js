import React, { Component, PropTypes } from 'react'
import { Card } from 'semantic-ui-react'

import ScreenshotCard from '../components/ScreenshotCard'

import { getFavoriteScreenshots } from '../actions/authed'

class UserFavorites extends Component {

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(getFavoriteScreenshots())
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

UserFavorites.propTypes = {
  dispatch: PropTypes.func,
  screenshots: PropTypes.array,
  zooming: PropTypes.object,
  isAuthenticated: PropTypes.bool
}

export default UserFavorites
