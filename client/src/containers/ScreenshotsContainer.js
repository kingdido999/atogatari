import React, { Component } from 'react'
import { connect } from 'react-redux'

import ScreenshotsPage from '../components/ScreenshotsPage'
import { getScreenshots } from '../actions/entities'

class ScreenshotsContainer extends Component {
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(getScreenshots())
  }
  render() {
    return <ScreenshotsPage {...this.props} />
  }
}

function mapStateToProps(state) {
  const { user, entities, screenshots } = state
  const { users } = entities
  const { isAuthenticated, uid } = user
  const { ids, view, itemsPerRow } = screenshots

  return {
    isAuthenticated,
    uid,
    users,
    view,
    itemsPerRow,
    screenshots: entities.screenshots,
    screenshotIds: ids
  }
}

export default connect(mapStateToProps)(ScreenshotsContainer)
