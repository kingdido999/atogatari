import React, { Component } from 'react'
import { connect } from 'react-redux'

import TagsPage from '../components/TagsPage'
import { getTags } from '../actions/entities'

class TagsContainer extends Component {
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(getTags())
  }
  render() {
    return <TagsPage {...this.props} />
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
