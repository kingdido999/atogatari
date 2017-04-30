import React, { Component } from 'react'
import { connect } from 'react-redux'

import TagsPage from '../components/TagsPage'
import { getTagsByTypeIfNeeded } from '../actions/entities'
import { capitalizeFirstLetter } from '../utils'

class TagsContainer extends Component {
  componentDidMount() {
    const { dispatch, params } = this.props
    const { type } = params
    dispatch(getTagsByTypeIfNeeded(capitalizeFirstLetter(type)))
  }

  componentWillReceiveProps(nextProps) {
    const { params, dispatch } = this.props

    const type = nextProps.params.type
    if (type !== params.type) {
      dispatch(getTagsByTypeIfNeeded(capitalizeFirstLetter(type)))
    }
  }

  render() {
    return <TagsPage {...this.props} />
  }
}

function mapStateToProps(state, ownProps) {
  const { user, entities, tagLists, ui } = state
  const { isAuthenticated } = user
  const { itemsPerRow } = ui
  const { params } = ownProps
  const { type } = params
  const tagList = tagLists[capitalizeFirstLetter(type)]

  return {
    isAuthenticated,
    tagNames: tagList ? tagList.names : [],
    tags: entities.tags,
    type,
    itemsPerRow
  }
}

export default connect(mapStateToProps)(TagsContainer)
