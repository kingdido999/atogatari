import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Container, Segment, Label } from 'semantic-ui-react'
import Zooming from 'zooming'

import ScreenshotCards from '../components/ScreenshotCards'
import { getTagByNameIfNeeded } from '../actions/entities'
import { getUserFavoritesIfNeeded } from '../actions/user'

class Tag extends Component {

  componentWillMount () {
    const { params, dispatch } = this.props
    const { name } = params
    dispatch(getTagByNameIfNeeded(name))
    dispatch(getUserFavoritesIfNeeded())
  }

  componentWillReceiveProps(nextProps) {
    const { params, dispatch } = this.props

    const name = nextProps.params.name
    if (name !== params.name) {
      dispatch(getTagByNameIfNeeded(name))
    }
  }

  render () {
    const { tag, screenshotIds } = this.props
    if (!tag) return null

    return (
      <Container>
        <Segment>
          <Label size='large' color='teal' content={tag.name} detail={screenshotIds.length} />
        </Segment>
        <Segment vertical>
          <ScreenshotCards
            screenshotIds={screenshotIds}
            zooming={new Zooming()}
            { ...this.props }
          />
        </Segment>

      </Container>
    )
  }
}

Tag.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  tag: PropTypes.object,
  screenshots: PropTypes.object.isRequired,
  screenshotFavorites: PropTypes.object.isRequired,
  userFavorites: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
  const { entities, user, screenshots, screenshotFavorites, userFavorites } = state
  const { isAuthenticated, uid } = user
  const { sortBy, nsfw, view } = screenshots
  const { tags } = entities
  const { name } = ownProps.params
  const tag = tags[name]

  let screenshotIds = tag ? tag.screenshots : []

  screenshotIds = screenshotIds.filter(id => {
    if (nsfw) return true
    return entities.screenshots[id].nsfw === false
  })

  screenshotIds = screenshotIds.sort((i, j) => {
    if (sortBy === 'date') {
      const dateI = new Date(entities.screenshots[i].createdAt)
      const dateJ = new Date(entities.screenshots[j].createdAt) 

      if (dateI > dateJ) return -1
      if (dateI < dateJ) return 1
      return 0
    }

    if (sortBy === 'popularity') {
      const scoreI = entities.screenshots[i].favorites.length
      const scoreJ = entities.screenshots[j].favorites.length
      return scoreJ - scoreI
    }

    return 0
  })

  return {
    isAuthenticated,
    view,
    tag,
    screenshotIds,
    screenshots: entities.screenshots,
    screenshotFavorites,
    userFavorites: userFavorites[uid]
  }
}

export default connect(mapStateToProps)(Tag)
