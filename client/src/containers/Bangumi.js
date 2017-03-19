import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Container, Header, Card } from 'semantic-ui-react'
import Zooming from 'zooming'
import { uniq } from 'lodash'

import ScreenshotCard from '../components/ScreenshotCard'
import ScreenshotFilters from '../components/ScreenshotFilters'
import { getBangumiIfNeeded } from '../actions/entities'
import { getUserFavoritesIfNeeded } from '../actions/user'

class Bangumi extends Component {

  componentWillMount () {
    const { params, dispatch } = this.props
    const { bangumiId } = params
    dispatch(getBangumiIfNeeded(bangumiId))
    dispatch(getUserFavoritesIfNeeded())
  }

  componentWillReceiveProps(nextProps) {
    const { params, dispatch } = this.props

    const bangumiId = nextProps.params.bangumiId
    if (bangumiId !== params.bangumiId) {
      dispatch(getBangumiIfNeeded(bangumiId))
    }
  }

  render () {
    const { dispatch, params, isAuthenticated, bangumi, screenshots, bangumiScreenshots, screenshotFavorites, userFavorites } = this.props
    const { bangumiId } = params

    if (!bangumi) return null

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
      <Container>
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
              userFavorites={userFavorites}
              screenshotFavorites={screenshotFavorites[id]}
            />
          )}
        </Card.Group>
      </Container>
    )
  }
}

Bangumi.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

function mapStateToProps(state, ownProps) {
  const { entities, user, bangumiScreenshots, screenshotFavorites } = state
  const { isAuthenticated, favorites } = user
  const { bangumis, screenshots } = entities
  const bangumi = bangumis[ownProps.params.bangumiId]

  return {
    isAuthenticated,
    bangumi,
    bangumiScreenshots,
    screenshots,
    screenshotFavorites,
    userFavorites: favorites
  }
}

export default connect(mapStateToProps)(Bangumi)
