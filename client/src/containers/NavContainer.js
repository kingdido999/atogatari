import React, { Component } from 'react'
import { connect } from 'react-redux'

import Nav from '../components/Nav'

class NavContainer extends Component {
  render() {
    return <Nav {...this.props} />
  }
}

function mapStateToProps(state) {
  const { environment, user, search } = state
  const { isMobile } = environment
  const { isAuthenticated, uid } = user

  return {
    isMobile,
    isAuthenticated,
    uid,
    search
  }
}

export default connect(mapStateToProps)(NavContainer)
