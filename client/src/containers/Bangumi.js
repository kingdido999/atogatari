import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Segment, Header, Item } from 'semantic-ui-react'
import Zooming from 'zooming'

import EpisodeItem from '../components/EpisodeItem'

import { getBangumi } from '../actions/bangumi'
import { getFavorites } from '../actions/favorite'

class Bangumi extends Component {

  componentWillMount () {
    const { params, dispatch } = this.props
    dispatch(getBangumi({ id: params.bangumiId }))

    dispatch(getFavorites({
      token: localStorage.getItem('token')
    }))
  }

  componentWillReceiveProps(nextProps) {
    const id = nextProps.params.bangumiId
    if (id !== this.props.params.bangumiId) {
      this.props.dispatch(getBangumi({ id: id }))
    }
  }

  render () {
    const { bangumiItem, favorites, dispatch } = this.props

    if (!bangumiItem || !favorites) return null

    const { title, episodes } = bangumiItem
    const zooming = new Zooming()

    return (
      <Segment basic>
        <Header as="h1">{title}</Header>
        <Item.Group divided>
          {episodes.map(episode =>
            <EpisodeItem
              dispatch={dispatch}
              key={episode._id}
              index={episode.index}
              screenshots={episode.screenshots}
              zooming={zooming}
              favorites={favorites}
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
  favorites: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  const { bangumi, favorite } = state
  const { isFetching, bangumiItem } = bangumi
  const { favorites } = favorite

  return {
    isFetching,
    bangumiItem,
    favorites
  }
}

export default connect(mapStateToProps)(Bangumi)
