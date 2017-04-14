import React, { Component, PropTypes } from 'react'
import { Container, Segment, Label } from 'semantic-ui-react'
import Zooming from 'zooming'

import ScreenshotCards from '../components/ScreenshotCards'
import { getTagByNameIfNeeded } from '../actions/entities'
import { getUserFavoritesIfNeeded } from '../actions/user'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  tag: PropTypes.object,
  screenshots: PropTypes.object.isRequired,
  screenshotFavorites: PropTypes.object.isRequired,
  userFavorites: PropTypes.object,
}

class TagPage extends Component {

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
        <ScreenshotCards
          screenshotIds={screenshotIds}
          zooming={new Zooming()}
          { ...this.props }
        />
      </Container>
    )
  }
}

TagPage.propTypes = propTypes

export default TagPage