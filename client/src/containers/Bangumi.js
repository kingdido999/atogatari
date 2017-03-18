import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Segment, Header, Card } from 'semantic-ui-react'
import Zooming from 'zooming'
import { uniq } from 'lodash'

import ScreenshotCard from '../components/ScreenshotCard'
import ScreenshotFilters from '../components/ScreenshotFilters'
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
    const { dispatch, params, isAuthenticated, bangumi, screenshots, bangumiScreenshots, favorites, userFavorites } = this.props
    const { bangumiId } = params

    if (!bangumi) {
      return (
        <Segment basic loading />
      )
    }

    const screenshotIds = bangumiScreenshots[bangumiId].ids

    const episodes = uniq(screenshotIds
    .reduce((acc, id) => {
      return acc.concat(screenshots[id].episode)
    }, []))
    .sort((a, b) => a - b)

    const episode = bangumiScreenshots[bangumiId].episode
    const filteredScreenshotIds = episode !== undefined
    ? screenshotIds.filter(screenshotId => {
      return screenshots[screenshotId].episode === episode
    })
    : screenshotIds

    return (
      <Segment basic>
        <Header as="h1">{bangumi.title}</Header>
        <ScreenshotFilters
          dispatch={dispatch}
          bangumiId={bangumiId}
          episodes={episodes}
          bangumiScreenshots={bangumiScreenshots[bangumiId]}
        />

        <Card.Group>
          {filteredScreenshotIds.map(id =>
            <ScreenshotCard
              key={id}
              dispatch={dispatch}
              isAuthenticated={isAuthenticated}
              zooming={new Zooming()}
              screenshot={screenshots[id]}
              favorites={favorites}
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
  const { entities, user, bangumis, bangumiScreenshots, favorites, authed } = state
  const { isAuthenticated } = user
  const { isFetching } = bangumis
  const { screenshots } = entities

  const bangumi = entities.bangumis[ownProps.params.bangumiId]

  return {
    isAuthenticated,
    isFetching,
    bangumi,
    bangumiScreenshots,
    screenshots,
    favorites,
    userFavorites: authed.favorites
  }
}

export default connect(mapStateToProps)(Bangumi)
