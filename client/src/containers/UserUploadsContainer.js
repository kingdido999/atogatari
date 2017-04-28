import React, { Component } from 'react'
import { connect } from 'react-redux'

import UserUploadsPage from '../components/UserUploadsPage'
import { getFilteredScreenshots, resetFilter } from '../actions/entities'

class UserUploadsContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(resetFilter())
    dispatch(getFilteredScreenshots())
  }

  componentWillReceiveProps(nextProps) {
    const { params, dispatch } = this.props

    const userId = nextProps.params.userId
    if (userId !== params.userId) {
      dispatch(resetFilter())
      dispatch(getFilteredScreenshots())
    }
  }

  render() {
    return <UserUploadsPage {...this.props} />
  }
}

function mapStateToProps(state, ownProps) {
  const { user, entities, ui, screenshotLists, filter, routing } = state
  const { locationBeforeTransitions } = routing
  const { pathname } = locationBeforeTransitions
  const { isAuthenticated, uid } = user
  const { view, itemsPerRow } = ui
  const { favorites, users, tags } = entities
  const { params } = ownProps
  const { userId } = params
  const key = JSON.stringify({ ...filter, pathname })
  const screenshotList = screenshotLists[key]

  return {
    view,
    users,
    isAuthenticated,
    authedUser: users[uid],
    tags,
    uid: userId,
    itemsPerRow,
    screenshotIds: screenshotList ? screenshotList.ids : [],
    screenshots: entities.screenshots,
    favorites
  }
}

export default connect(mapStateToProps)(UserUploadsContainer)
