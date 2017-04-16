import React, { Component } from 'react'
import { connect } from 'react-redux'

import ScreenshotPage from '../components/ScreenshotPage'

class ScreenshotContainer extends Component {

  render () {
    return <ScreenshotPage { ...this.props } />
  }
}

function mapStateToProps(state, ownProps) {
  const { entities, user, screenshotFavorites, screenshotTags, userFavorites } = state
  const { users, screenshots } = entities
  const { isAuthenticated, uid } = user
  const { screenshotId } = ownProps.params
  const screenshot = screenshots[screenshotId]
  const authedUser = users[uid]   
  const isOwner = screenshot !== undefined 
    && uid === screenshot.user
  const isAdmin = authedUser !== undefined
    && authedUser.roles 
    && authedUser.roles.includes('admin')

  return {
    isAuthenticated,
    isOwner,
    isAdmin,
    screenshot,
    users,
    screenshotFavorites: screenshotFavorites[screenshotId],
    screenshotTags: screenshotTags[screenshotId],
    userFavorites: userFavorites[uid]
  }
}

export default connect(mapStateToProps)(ScreenshotContainer)
