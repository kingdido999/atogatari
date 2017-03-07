import React, { Component, PropTypes } from 'react'
import { Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
// import Zooming from 'zooming'

// import ScreenshotCard from '../components/ScreenshotCard'


class User extends Component {

  render() {
    // const { dispatch, favorites, isAuthenticated } = this.props
    // const zooming = new Zooming()

    return (
      <Card.Group>
        {/* {favorites.map(screenshot =>
          <ScreenshotCard
            dispatch={dispatch}
            key={screenshot._id}
            screenshot={screenshot}
            zooming={zooming}
            favorites={favorites}
            isAuthenticated={isAuthenticated}
          />
        )} */}
      </Card.Group>
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
  const { favorites } = favorite

  return {
    isAuthenticated,
    favorites,
  }
}

export default connect(mapStateToProps)(User)
