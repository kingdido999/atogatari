import React, { Component } from 'react'
import { connect } from 'react-redux'

import TagPage from '../components/TagPage'
import { getTagIfNeeded } from '../actions/entities'

class TagContainer extends Component {
  componentDidMount() {
    const { params, dispatch } = this.props
    const { name } = params
    dispatch(getTagIfNeeded(name))
  }

  componentWillReceiveProps(nextProps) {
    const { params, dispatch } = this.props

    const name = nextProps.params.name
    if (name !== params.name) {
      dispatch(getTagIfNeeded(name))
    }
  }
  render() {
    return <TagPage {...this.props} />
  }
}

function mapStateToProps(state, ownProps) {
  const { entities, user, ui } = state
  const { isAuthenticated, uid } = user
  const { view, itemsPerRow } = ui
  const { tags, users } = entities
  const { name } = ownProps.params
  const tag = tags[name]

  return {
    isAuthenticated,
    authedUser: users[uid],
    users: entities.users,
    view,
    itemsPerRow,
    tag,
    screenshotIds: tag ? tag.screenshots : [],
    screenshots: entities.screenshots
  }
}

export default connect(mapStateToProps)(TagContainer)
