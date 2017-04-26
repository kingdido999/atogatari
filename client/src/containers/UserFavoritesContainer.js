import React, { Component } from 'react'
import { connect } from 'react-redux'

import UserFavoritesPage from '../components/UserFavoritesPage'

class UserFavoritesContainer extends Component {
  render() {
    return <UserFavoritesPage {...this.props} />
  }
}

function mapStateToProps(state, ownProps) {
  const { user, entities, ui } = state
  const { isAuthenticated, uid } = user
  const { view, itemsPerRow } = ui
  const { favorites, users, tags } = entities
  const { params } = ownProps
  const { userId } = params
  const screenshotIds = users[userId]
    ? users[userId].favorites.reduce(
        (acc, id) => acc.concat(favorites[id].screenshot),
        []
      )
    : []

  return {
    view,
    itemsPerRow,
    isAuthenticated,
    authedUser: users[uid],
    tags,
    users,
    uid: userId,
    screenshotIds,
    screenshots: entities.screenshots,
    favorites
  }
}

export default connect(mapStateToProps)(UserFavoritesContainer)
