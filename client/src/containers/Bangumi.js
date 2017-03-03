import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Segment, Header, Item } from 'semantic-ui-react'
import Zooming from 'zooming'

import EpisodeItem from '../components/EpisodeItem'

import { getBangumi } from '../actions/bangumi'

class Bangumi extends Component {

  componentWillMount () {
    const id = this.props.params.bangumiId
    this.props.dispatch(getBangumi({ id: id }))
  }

  componentDidUpdate () {
    const { bangumiItem, numRendered } = this.props

    const totalScreenshots = bangumiItem.episodes.reduce((sum, episode) => {
      return sum + episode.screenshots.length
    }, 0)

    if (totalScreenshots === numRendered) {
      new Zooming({
        defaultZoomable: '.screenshot'
      })
    }
  }

  render () {
    const { bangumiItem, dispatch } = this.props

    if (!bangumiItem) return null

    const { title, episodes } = bangumiItem

    return (
      <Segment basic>
        <Header as="h2">{title}</Header>
        <Item.Group>
          {episodes.map(episode =>
            <EpisodeItem
              dispatch={dispatch}
              key={episode._id}
              index={episode.index}
              screenshots={episode.screenshots}
            />
          )}
        </Item.Group>
      </Segment>
    )
  }
}

Bangumi.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  bangumiItem: PropTypes.object,
  numRendered: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  const { bangumi, screenshot } = state
  const { isFetching, bangumiItem } = bangumi
  const { numRendered } = screenshot

  return {
    isFetching,
    bangumiItem,
    numRendered
  }
}

export default connect(mapStateToProps)(Bangumi)
