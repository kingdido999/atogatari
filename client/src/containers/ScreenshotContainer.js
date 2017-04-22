import React, { Component } from 'react'
import { connect } from 'react-redux'

import ScreenshotPage from '../components/ScreenshotPage'
import { getScreenshotIfNeeded } from '../actions/entities'

class ScreenshotContainer extends Component {
  componentWillMount() {
    const { params, dispatch } = this.props
    const { screenshotId } = params
    dispatch(getScreenshotIfNeeded(screenshotId))
  }

  componentWillReceiveProps(nextProps) {
    const { params, dispatch } = this.props
    const screenshotId = nextProps.params.screenshotId

    if (screenshotId !== params.screenshotId) {
      dispatch(getScreenshotIfNeeded(screenshotId))
    }
  }
  render() {
    return <ScreenshotPage {...this.props} />
  }
}

function mapStateToProps(state, ownProps) {
  const { entities, user } = state
  const { users, screenshots, tags } = entities
  const { uid } = user
  const { screenshotId } = ownProps.params
  const screenshot = screenshots[screenshotId]
  const authedUser = users[uid]
  const isOwner = screenshot !== undefined && uid === screenshot.user
  const isAdmin =
    authedUser !== undefined &&
    authedUser.roles &&
    authedUser.roles.includes('admin')

  return {
    isOwner,
    isAdmin,
    authedUser,
    screenshot,
    users,
    tags
  }
}

export default connect(mapStateToProps)(ScreenshotContainer)
