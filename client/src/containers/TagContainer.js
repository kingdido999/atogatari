import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getTagScreenshotIds } from '../selectors'
import TagPage from '../components/TagPage'

class TagContainer extends Component {
  render() {
    return <TagPage {...this.props} />
  }
}

function mapStateToProps(state, ownProps) {
  const {
    entities,
    user,
    screenshots,
    screenshotFavorites,
    userFavorites
  } = state
  const { isAuthenticated, uid } = user
  const { view, itemsPerRow } = screenshots
  const { tags } = entities
  const { name } = ownProps.params
  const tag = tags[name]

  return {
    isAuthenticated,
    users: entities.users,
    uid,
    view,
    itemsPerRow,
    tag,
    screenshotIds: getTagScreenshotIds(state, ownProps),
    screenshots: entities.screenshots,
    screenshotFavorites,
    userFavorites: userFavorites[uid]
  }
}

export default connect(mapStateToProps)(TagContainer)
