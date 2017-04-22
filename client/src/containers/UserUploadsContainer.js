import React, { Component } from 'react'
import { connect } from 'react-redux'

import UserUploadsPage from '../components/UserUploadsPage'
import { getScreenshotsByUserIdIfNeeded } from '../actions/entities'

class UserUploadsContainer extends Component {
  componentWillMount() {
    const { dispatch, params } = this.props
    const { userId } = params
    dispatch(getScreenshotsByUserIdIfNeeded(userId))
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, params } = this.props
    const userId = nextProps.params.userId

    if (userId !== params.userId) {
      dispatch(getScreenshotsByUserIdIfNeeded(userId))
    }
  }

  render() {
    return <UserUploadsPage {...this.props} />
  }
}

function mapStateToProps(state, ownProps) {
  const { user, entities, screenshots } = state
  const { isAuthenticated, uid } = user
  const { view, itemsPerRow } = screenshots
  const { favorites, users } = entities
  const { params } = ownProps
  const { userId } = params
  const screenshotIds = users[userId] ? users[userId].screenshots : []

  return {
    isAuthenticated,
    view,
    users,
    authedUser: users[uid],
    uid: userId,
    itemsPerRow,
    screenshotIds,
    screenshots: entities.screenshots,
    favorites
  }
}

export default connect(mapStateToProps)(UserUploadsContainer)
