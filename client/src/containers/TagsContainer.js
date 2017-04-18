import React, { Component } from 'react'
import { connect } from 'react-redux'

import TagsPage from '../components/TagsPage'

class TagsContainer extends Component {

  render () {
    return <TagsPage { ...this.props } />
  }
}

function mapStateToProps(state) {
  const { user, entities, tags } = state
  const { isAuthenticated } = user

  return {
    isAuthenticated,
    tagNames: tags ? tags.names : [],
    tags: entities.tags
  }
}

export default connect(mapStateToProps)(TagsContainer)