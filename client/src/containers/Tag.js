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
    const { tag } = this.props
    if (!tag) return null

    return (
      <Container>
        <Segment vertical>
          <Label size='huge' color='blue' content={tag.name} detail={tag.screenshots.length} />
        </Segment>
        <Segment vertical>
          <ScreenshotCards
            screenshotIds={tag.screenshots}
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
  const { entities, user, screenshotFavorites, userFavorites } = state
  const { isAuthenticated, uid } = user
  const { screenshots, tags } = entities
  const { name } = ownProps.params
  const tag = tags[name]

  return {
    isAuthenticated,
    tag,
    screenshots,
    screenshotFavorites,
    userFavorites: userFavorites[uid]
  }
}

export default connect(mapStateToProps)(Tag)
