import React, { Component } from 'react'
import { connect } from 'react-redux'

import UserPage from '../components/UserPage'
import { getUserByIdIfNeeded } from '../actions/entities'

class UserContainer extends Component {
  componentDidMount() {
    const { dispatch, params } = this.props
    const { userId } = params
    dispatch(getUserByIdIfNeeded(userId))
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, params } = this.props
    const userId = nextProps.params.userId

    if (userId !== params.userId) {
      dispatch(getUserByIdIfNeeded(userId))
    }
  }

  render() {
    return <UserPage {...this.props} />
  }
}

function mapStateToProps(state, ownProps) {
  const { environment, entities, routing } = state
  const { isMobile } = environment
  const { users } = entities
  const { params } = ownProps
  const { userId } = params
  const { locationBeforeTransitions } = routing
  const { pathname } = locationBeforeTransitions
  const matches = pathname.match('/favorites') || pathname.match('/uploads')

  return {
    isMobile,
    user: users[userId],
    showFilters: matches !== null
  }
}

export default connect(mapStateToProps)(UserContainer)
