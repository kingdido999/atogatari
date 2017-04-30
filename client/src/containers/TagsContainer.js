import React, { Component } from 'react'
import { connect } from 'react-redux'

import TagsPage from '../components/TagsPage'
import { getTags } from '../actions/entities'
import { capitalizeFirstLetter } from '../utils'

class TagsContainer extends Component {
  componentDidMount() {
    const { dispatch, params } = this.props
    const { type } = params
    dispatch(getTags({ type: capitalizeFirstLetter(type) }))
  }

  componentWillReceiveProps(nextProps) {
    const { params, dispatch } = this.props

    const type = nextProps.params.type
    if (type !== params.type) {
      dispatch(getTags({ type: capitalizeFirstLetter(type) }))
    }
  }

  render() {
    return <TagsPage {...this.props} />
  }
}

function mapStateToProps(state, ownProps) {
  const { user, entities, tags, ui } = state
  const { isAuthenticated } = user
  const { itemsPerRow } = ui
  const { params } = ownProps
  const { type } = params

  return {
    isAuthenticated,
    tagNames: tags ? tags.names : [],
    tags: entities.tags,
    type,
    itemsPerRow
  }
}

export default connect(mapStateToProps)(TagsContainer)
