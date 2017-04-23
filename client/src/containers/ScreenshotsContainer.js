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
  const { user, entities, screenshotLists, filter, ui } = state
  const { users } = entities
  const { uid } = user
  const { view, itemsPerRow } = ui
  const { sortBy, nsfw, total, pages, page, limit } = filter
  const key = JSON.stringify({ sortBy, nsfw, total, limit, pages, page })
  const screenshotList = screenshotLists[key]

  return {
    authedUser: users[uid],
    view,
    itemsPerRow,
    users,
    screenshots: entities.screenshots,
    screenshotIds: screenshotList ? screenshotList.ids : []
  }
}

export default connect(mapStateToProps)(ScreenshotsContainer)
