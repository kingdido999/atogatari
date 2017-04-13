import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Zooming from 'zooming'

import ScreenshotCards from '../components/ScreenshotCards'
import { getFavoritesByUserIdIfNeeded } from '../actions/entities'
import { getFilteredUserFavoriteScreenshotIds } from '../selectors'

class UserFavorites extends Component {

  componentWillMount () {
    const { dispatch, params } = this.props
    const { userId } = params
    dispatch(getFavoritesByUserIdIfNeeded(userId))
  }

  render() {
    return (
      <ScreenshotCards
        zooming={new Zooming()}
        { ...this.props }
      />
    )
  }
}

UserFavorites.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  screenshots: PropTypes.object.isRequired,
  favorites: PropTypes.object.isRequired,
  userFavorites: PropTypes.object,
  screenshotFavorites: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
  const { user, entities, screenshots, screenshotFavorites } = state
  const { isAuthenticated } = user
  const { view } = screenshots
  const { favorites } = entities

  return {
    isAuthenticated,
    view,
    screenshotIds: getFilteredUserFavoriteScreenshotIds(state, ownProps),
    screenshots: entities.screenshots,
    favorites,
    screenshotFavorites
  }
}

export default connect(mapStateToProps)(UserFavorites)
