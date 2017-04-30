import React, { Component } from 'react'
import { connect } from 'react-redux'

import Nav from '../components/Nav'
import { getTagsByType } from '../actions/entities'

class NavContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getTagsByType('Character'))
    dispatch(getTagsByType('Anime'))
    dispatch(getTagsByType('General'))
  }
  render() {
    return <Nav {...this.props} />
  }
}

function mapStateToProps(state) {
  const { environment, user, tagLists, search } = state
  const { isMobile } = environment
  const { isAuthenticated, uid } = user

  return {
    isMobile,
    isAuthenticated,
    uid,
    search,
    tagLists
  }
}

export default connect(mapStateToProps)(NavContainer)
