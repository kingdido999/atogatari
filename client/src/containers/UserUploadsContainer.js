import React, { Component } from 'react'
import { connect } from 'react-redux'

import UserUploadsPage from '../components/UserUploadsPage'

class UserUploadsContainer extends Component {
  render() {
    return <UserUploadsPage {...this.props} />
  }
}

function mapStateToProps(state, ownProps) {
  const { user, entities, ui } = state
  const { isAuthenticated, uid } = user
  const { view, itemsPerRow } = ui
  const { favorites, users, tags } = entities
  const { params } = ownProps
  const { userId } = params
  const screenshotIds = users[userId] ? users[userId].screenshots : []

  return {
    view,
    users,
    isAuthenticated,
    authedUser: users[uid],
    tags,
    uid: userId,
    itemsPerRow,
    screenshotIds,
    screenshots: entities.screenshots,
    favorites
  }
}

export default connect(mapStateToProps)(UserUploadsContainer)
