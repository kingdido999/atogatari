import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
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
      <Grid columns={1}>
        <Grid.Row>
          <BangumiTitle size='huge' bangumi={bangumi} />
        </Grid.Row>

        <Grid.Row>
          <ScreenshotFilters
            { ...this.props }
          />
        </Grid.Row>

        <Grid.Row>
          <ScreenshotCards
            screenshotIds={filteredScreenshotIds}
            zooming={new Zooming()}
            { ...this.props }
          />
        </Grid.Row>
      </Grid>
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
  userFavorites: PropTypes.object.isRequired,
}

function mapStateToProps(state, ownProps) {
  const { entities, user, bangumiScreenshots, screenshotFavorites } = state
  const { isAuthenticated, favorites } = user
  const { bangumis, screenshots } = entities
  const { bangumiId } = ownProps.params
  const isFetching = !(bangumiId in bangumis)

  return {
    isAuthenticated,
    isFetching,
    bangumiId,
    bangumi: bangumis[bangumiId],
    bangumiScreenshots: bangumiScreenshots[bangumiId],
    screenshots,
    screenshotFavorites,
    userFavorites: favorites
  }
}

export default connect(mapStateToProps)(Bangumi)
