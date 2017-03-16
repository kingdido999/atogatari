import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Segment, Header, Card } from 'semantic-ui-react'
import Zooming from 'zooming'

import ScreenshotCard from '../components/ScreenshotCard'
import { getBangumiIfNeeded } from '../actions/entities'

class Bangumi extends Component {

  componentWillMount () {
    const { params, dispatch } = this.props
    const { bangumiId } = params
    dispatch(getBangumiIfNeeded(bangumiId))
  }

  componentWillReceiveProps(nextProps) {
    const { params, dispatch } = this.props

    const bangumiId = nextProps.params.bangumiId
    if (bangumiId !== params.bangumiId) {
      dispatch(getBangumiIfNeeded(bangumiId))
    }
  }

  render () {
    const { dispatch, params, isAuthenticated, bangumis, screenshots, allFavorites, userFavorites } = this.props
    const { bangumiId } = params

    if (bangumis.isFetching) {
      return (
        <Segment basic loading />
      )
    }

    const bangumi = bangumis.byId[bangumiId]
    const screenshotIds = bangumi.screenshots

    return (
      <Segment basic>
        <Header as="h1">{bangumi.title}</Header>
        <Card.Group>
          {screenshotIds.map(id =>
            <ScreenshotCard
              key={id}
              dispatch={dispatch}
              isAuthenticated={isAuthenticated}
              zooming={new Zooming()}
              screenshot={screenshots.byId[id]}
              allFavorites={allFavorites}
              userFavorites={userFavorites}
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
}

function mapStateToProps(state, ownProps) {
  const { user, bangumis, screenshots, favorites, authed } = state
  const { isAuthenticated } = user

  return {
    isAuthenticated,
    bangumis,
    screenshots,
    allFavorites: favorites,
    userFavorites: authed.favorites
  }
}

export default connect(mapStateToProps)(Bangumi)
