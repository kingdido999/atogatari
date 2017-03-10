import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Segment, Header, Card } from 'semantic-ui-react'
import Zooming from 'zooming'

import ScreenshotCard from '../components/ScreenshotCard'

import { getBangumi, getScreenshots } from '../actions/entities'
import { getFavorites } from '../actions/authed'

class Bangumi extends Component {

  componentWillMount () {
    const { params, dispatch, isAuthenticated } = this.props
    const { bangumiId } = params
    dispatch(getBangumi({ id: bangumiId }))
    dispatch(getScreenshots({ bangumiId: bangumiId }))

    if (isAuthenticated) {
      dispatch(getFavorites({
        token: localStorage.getItem('token')
      }))
    }
  }

  componentWillReceiveProps(nextProps) {
    const { params, dispatch } = this.props

    const bangumiId = nextProps.params.bangumiId
    if (bangumiId !== params.bangumiId) {
      dispatch(getBangumi({ id: bangumiId }))
      dispatch(getScreenshots({ bangumiId: bangumiId }))
    }
  }

  render () {
    const { dispatch, isAuthenticated, isFetching, selectedBangumi, screenshots, favorites } = this.props

    if (isFetching || !selectedBangumi) return null

    const zooming = new Zooming()

    return (
      <Segment basic>
        <Header as="h1">{selectedBangumi.title}</Header>
          <Card.Group>
            {screenshots.map(screenshot =>
              <ScreenshotCard
                dispatch={dispatch}
                key={screenshot._id}
                screenshot={screenshot}
                zooming={zooming}
                favorites={favorites}
                isAuthenticated={isAuthenticated}
              />
            )}
          </Card.Group>
      </Segment>
    )
  }
}

Bangumi.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  favorites: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  const { auth, authed, entities } = state
  const { isAuthenticated } = auth
  const { isFetching, selectedBangumi, screenshots } = entities
  const { favorites } = authed

  return {
    isAuthenticated,
    isFetching,
    selectedBangumi,
    screenshots,
    favorites
  }
}

export default connect(mapStateToProps)(Bangumi)
