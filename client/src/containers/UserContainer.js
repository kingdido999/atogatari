import React, { Component } from 'react'
import { connect } from 'react-redux'

import UserPage from '../components/UserPage'
import { getUserByIdIfNeeded } from '../actions/entities'

class UserContainer extends Component {
  componentWillMount() {
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
  const { entities } = state
  const { users } = entities
  const { params } = ownProps
  const { userId } = params

  return {
    user: users[userId]
  }
}

export default connect(mapStateToProps)(UserContainer)
