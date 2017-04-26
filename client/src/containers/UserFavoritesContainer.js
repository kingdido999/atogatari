import React, { Component } from 'react'
import { connect } from 'react-redux'

import UserFavoritesPage from '../components/UserFavoritesPage'
import { getFilteredScreenshots } from '../actions/entities'

class UserFavoritesContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getFilteredScreenshots())
  }

  componentWillReceiveProps(nextProps) {
    const { params, dispatch } = this.props

    const userId = nextProps.params.userId
    if (userId !== params.userId) {
      dispatch(getFilteredScreenshots())
    }
  }

  render() {
    return <UserFavoritesPage {...this.props} />
  }
}

function mapStateToProps(state, ownProps) {
  const { user, entities, screenshotLists, filter, ui, routing } = state
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
    itemsPerRow,
    isAuthenticated,
    authedUser: users[uid],
    tags,
    users,
    uid: userId,
    screenshotIds: screenshotList ? screenshotList.ids : [],
    screenshots: entities.screenshots,
    favorites
  }
}

export default connect(mapStateToProps)(UserFavoritesContainer)
