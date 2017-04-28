import React, { Component } from 'react'
import { connect } from 'react-redux'

import TagPage from '../components/TagPage'
import {
  getTagIfNeeded,
  getFilteredScreenshots,
  resetFilter
} from '../actions/entities'

class TagContainer extends Component {
  componentDidMount() {
    const { params, dispatch } = this.props
    const { name } = params
    dispatch(resetFilter())
    dispatch(getTagIfNeeded(name))
    dispatch(getFilteredScreenshots())
  }

  componentWillReceiveProps(nextProps) {
    const { params, dispatch } = this.props

    const name = nextProps.params.name
    if (name !== params.name) {
      dispatch(resetFilter())
      dispatch(getTagIfNeeded(name))
      dispatch(getFilteredScreenshots())
    }
  }
  render() {
    return <TagPage {...this.props} />
  }
}

function mapStateToProps(state, ownProps) {
  const { entities, user, screenshotLists, ui, filter, routing } = state
  const { locationBeforeTransitions } = routing
  const { pathname } = locationBeforeTransitions
  const { isAuthenticated, uid } = user
  const { view, itemsPerRow } = ui
  const { tags, users } = entities
  const { name } = ownProps.params
  const tag = tags[name]
  const key = JSON.stringify({ ...filter, pathname })
  const screenshotList = screenshotLists[key]

  return {
    isAuthenticated,
    authedUser: users[uid],
    users: entities.users,
    view,
    itemsPerRow,
    tags,
    tag,
    screenshotIds: screenshotList ? screenshotList.ids : [],
    screenshots: entities.screenshots
  }
}

export default connect(mapStateToProps)(TagContainer)
