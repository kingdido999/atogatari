import React, { Component } from 'react'
import { connect } from 'react-redux'

import TagsPage from '../components/TagsPage'
import { getTags } from '../actions/entities'

class TagsContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getTags())
  }
  render() {
    return <TagsPage {...this.props} />
  }
}

function mapStateToProps(state) {
  const { user, entities, tags, ui } = state
  const { isAuthenticated } = user
  const { itemsPerRow } = ui

  return {
    isAuthenticated,
    tagNames: tags ? tags.names : [],
    tags: entities.tags,
    itemsPerRow
  }
}

export default connect(mapStateToProps)(TagsContainer)
