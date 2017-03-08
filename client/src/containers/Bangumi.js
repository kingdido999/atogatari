import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Segment, Header, Item } from 'semantic-ui-react'
import Zooming from 'zooming'

import EpisodeItem from '../components/EpisodeItem'

import { getBangumi } from '../actions/bangumi'
import { getFavorites } from '../actions/favorite'

class Bangumi extends Component {

  componentWillMount () {
    const { params, dispatch, isAuthenticated } = this.props
    dispatch(getBangumi({ id: params.bangumiId }))

    if (isAuthenticated) {
      dispatch(getFavorites({
        token: localStorage.getItem('token')
      }))
    }
  }

  componentWillReceiveProps(nextProps) {
    const id = nextProps.params.bangumiId
    if (id !== this.props.params.bangumiId) {
      this.props.dispatch(getBangumi({ id: id }))
    }
  }

  render () {
    const { dispatch, isAuthenticated, selectedBangumi, favorites } = this.props

    if (!selectedBangumi || !favorites) return null

    const { title, episodes } = selectedBangumi
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
              isAuthenticated={isAuthenticated}
            />
          )}
        </Item.Group>
      </Segment>
    )
  }
}

Bangumi.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  selectedBangumi: PropTypes.object,
  favorites: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  const { auth, bangumi, favorite } = state
  const { isAuthenticated } = auth
  const { isFetching, selectedBangumi } = bangumi
  const { favorites } = favorite

  return {
    isAuthenticated,
    isFetching,
    selectedBangumi,
    favorites
  }
}

export default connect(mapStateToProps)(Bangumi)
