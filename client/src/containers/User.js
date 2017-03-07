import React, { Component, PropTypes } from 'react'
import { Segment, Header, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Zooming from 'zooming'

import ScreenshotCard from '../components/ScreenshotCard'

import { getFavorites } from '../actions/favorite'

class User extends Component {

  componentWillMount () {
    const { dispatch } = this.props

    dispatch(getFavorites({
      token: localStorage.getItem('token')
    }))
  }

  render() {
    const { dispatch, isFetching, favorites, isAuthenticated } = this.props
    const zooming = new Zooming()

    if (isFetching) return null
    console.log(favorites)

    return (
      <Segment basic>
        <Header as="h1">My favorites</Header>
        <Card.Group>
          {favorites.map(favorite =>
            <ScreenshotCard
              dispatch={dispatch}
              key={favorite.screenshot._id}
              screenshot={favorite.screenshot}
              zooming={zooming}
              favorites={favorites}
              isAuthenticated={isAuthenticated}
            />
          )}
        </Card.Group>
      </Segment>
    )
  }
}

User.propTypes = {
  dispatch: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { auth, favorite } = state
  const { isAuthenticated } = auth
  const { isFetching, favorites } = favorite

  return {
    isAuthenticated,
    isFetching,
    favorites,
  }
}

export default connect(mapStateToProps)(User)
