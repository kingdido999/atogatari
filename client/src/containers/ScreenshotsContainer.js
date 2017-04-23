import React, { Component } from 'react'
import { connect } from 'react-redux'

import ScreenshotsPage from '../components/ScreenshotsPage'
import { getFilteredScreenshots } from '../actions/entities'

class ScreenshotsContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getFilteredScreenshots())
  }

  render() {
    return <ScreenshotsPage {...this.props} />
  }
}

function mapStateToProps(state) {
  const { user, entities, screenshots, ui } = state
  const { users } = entities
  const { uid } = user
  const { view, itemsPerRow } = ui

  return {
    authedUser: users[uid],
    view,
    itemsPerRow,
    users,
    screenshots: entities.screenshots,
    screenshotIds: screenshots.ids
  }
}

export default connect(mapStateToProps)(ScreenshotsContainer)
