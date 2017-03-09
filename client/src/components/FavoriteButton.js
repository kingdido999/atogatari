import React, { Component, PropTypes } from 'react'
import { Button, Icon, Popup } from 'semantic-ui-react'
import { Link } from 'react-router'

import { addFavorite, removeFavorite } from '../actions/favorite'

class FavoriteButton extends Component {

  toggleFavorite = () => {
    const { dispatch, screenshotId, isFavorited } = this.props
    const data = {
      screenshotId: screenshotId,
      token: localStorage.getItem('token')
    }

    if (isFavorited) {
      dispatch(removeFavorite(data))
    } else {
      dispatch(addFavorite(data))
    }
  }

  renderIcon () {
    const { isFavorited } = this.props

    return (
      <Icon name="favorite" color={ isFavorited ? 'yellow' : 'grey' } />
    )
  }

  render () {
    const icon = this.renderIcon()
    const { isAuthenticated, favoriteCount } = this.props

    if (isAuthenticated) {
      return (
        <Button
          icon={icon}
          onClick={this.toggleFavorite}
          label={{ as: 'a', basic: true, content: favoriteCount }}
          labelPosition='right'
        />
      )
    }

    return (
      <Popup
        trigger={<Button icon='favorite' />}
        content={<Button color='green' content='Login' as={Link} to="/login" />}
        on='click'
        position='bottom center'
        label={{ as: 'a', basic: true, content: favoriteCount }}
        labelPosition='right'
      />
    )
  }
}

FavoriteButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  screenshotId: PropTypes.string.isRequired,
  isFavorited: PropTypes.bool,
  favoriteCount: PropTypes.number.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default FavoriteButton
