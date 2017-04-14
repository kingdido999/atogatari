import React, { Component } from 'react'
import { connect } from 'react-redux'

import UserPage from '../components/UserPage'

class UserContainer extends Component {
  render() {
    return <UserPage { ...this.props } />
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
