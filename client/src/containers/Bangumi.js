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

  componentWillReceiveProps(nextProps) {
    const id = nextProps.params.bangumiId
    if (id !== this.props.params.bangumiId) {
      this.props.dispatch(getBangumi({ id: id }))
    }
  }

  render () {
    const { bangumiItem, dispatch } = this.props

    if (!bangumiItem) return null

    const { title, episodes } = bangumiItem
    const zooming = new Zooming()

    return (
      <Segment basic>
        <Header as="h1">{title}</Header>
        <Item.Group>
          {episodes.map(episode =>
            <EpisodeItem
              dispatch={dispatch}
              key={episode._id}
              index={episode.index}
              screenshots={episode.screenshots}
              zooming={zooming}
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
}

function mapStateToProps(state) {
  const { bangumi } = state
  const { isFetching, bangumiItem } = bangumi

  return {
    isFetching,
    bangumiItem
  }
}

export default connect(mapStateToProps)(Bangumi)
