import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import Zooming from 'zooming'

import ScreenshotFilters from '../components/ScreenshotFilters'
import ScreenshotCards from '../components/ScreenshotCards'
import BangumiTitle from '../components/BangumiTitle'
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
    const { isFetching, bangumi, screenshots, bangumiScreenshots } = this.props

    if (isFetching) return null
    const episode = bangumiScreenshots.episode
    const filteredScreenshotIds = episode !== undefined
    ? bangumiScreenshots.ids.filter(screenshotId => {
      return screenshots[screenshotId].episode === episode
    })
    : bangumiScreenshots.ids

    return (
      <Container>
        <BangumiTitle size='huge' bangumi={bangumi} />

        <ScreenshotFilters
          { ...this.props }
        />

        <br/>

        <ScreenshotCards
          screenshotIds={filteredScreenshotIds}
          zooming={new Zooming()}
          { ...this.props }
        />
      </Container>
    )
  }
}

Bangumi.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  bangumiId: PropTypes.string.isRequired,
  bangumi: PropTypes.object,
  bangumiScreenshots: PropTypes.object,
  screenshots: PropTypes.object.isRequired,
  screenshotFavorites: PropTypes.object.isRequired,
  userFavorites: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
  const { entities, user, bangumiScreenshots, screenshotFavorites, userFavorites } = state
  const { isAuthenticated, uid } = user
  const { bangumis, screenshots } = entities
  const { bangumiId } = ownProps.params
  const isFetching = !(bangumiId in bangumis) || !(bangumiId in bangumiScreenshots)

  return {
    isAuthenticated,
    isFetching,
    bangumiId,
    bangumi: bangumis[bangumiId],
    bangumiScreenshots: bangumiScreenshots[bangumiId],
    screenshots,
    screenshotFavorites,
    userFavorites: userFavorites[uid]
  }
}

export default connect(mapStateToProps)(Bangumi)
