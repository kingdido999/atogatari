import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Segment, Header, Card } from 'semantic-ui-react'
import Zooming from 'zooming'

import ScreenshotCard from '../components/ScreenshotCard'
import { getBangumi } from '../actions/entities'

class Bangumi extends Component {

  componentWillMount () {
    const { params, dispatch, bangumiIds } = this.props
    const { bangumiId } = params

    if (!bangumiIds.includes(bangumiId)) {
      dispatch(getBangumi({ id: bangumiId }))
    }
  }

  componentWillReceiveProps(nextProps) {
    const { params, dispatch, bangumiIds } = this.props

    const bangumiId = nextProps.params.bangumiId
    if (bangumiId !== params.bangumiId && !bangumiIds.includes(bangumiId)) {
      dispatch(getBangumi({ id: bangumiId }))
    }
  }

  render () {
    const { dispatch, isAuthenticated, params, bangumis, favorites } = this.props
    const { bangumiId } = params

    const bangumi = bangumis[bangumiId]

    if (!bangumi) return null
    const screenshotIds = bangumi.screenshots
    const zooming = new Zooming()

    return (
      <Segment basic>
        <Header as="h1">{bangumi.title}</Header>
          <Card.Group>
            {screenshotIds.map(screenshotId =>
              <ScreenshotCard
                dispatch={dispatch}
                key={screenshotId}
                screenshotId={screenshotId}
                favorites={favorites}
                zooming={zooming}
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
}

function mapStateToProps(state) {
  const { user, entities, bangumis } = state
  const { isAuthenticated } = user

  return {
    isAuthenticated,
    bangumiIds: bangumis.items,
    bangumis: entities.bangumis,
  }
}

export default connect(mapStateToProps)(Bangumi)
