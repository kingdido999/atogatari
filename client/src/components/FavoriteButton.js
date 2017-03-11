import React, { Component, PropTypes } from 'react'
import { Button, Icon, Popup } from 'semantic-ui-react'
import { Link } from 'react-router'

import { toggleFavorite } from '../actions/authed'

class FavoriteButton extends Component {

  toggleFavorite = () => {
    const { dispatch, isAuthenticated, screenshotId } = this.props

    if (!isAuthenticated) return

    dispatch(toggleFavorite({
      screenshotId: screenshotId,
      token: localStorage.getItem('token')
    }))
  }

  renderIcon (isFavorited) {
    return (
      <Icon name="favorite" color={ isFavorited ? 'yellow' : 'grey' } />
    )
  }

  renderButton (isFavorited, favoritesCount) {
    const icon = this.renderIcon(isFavorited)

    if (favoritesCount === 0) {
      return (
        <Button
          icon={icon}
          onClick={this.toggleFavorite}
        />
      )
    } else {
      return (
        <Button
          icon={icon}
          onClick={this.toggleFavorite}
          label={{ as: 'a', content: favoritesCount }}
          labelPosition='right'
        />
      )
    }
  }

  renderLoginButton () {
    return (
      <Button color='green' content='Login' as={Link} to="/login" />
    )
  }

  render () {
    const { isAuthenticated, isFavorited, favoritesCount } = this.props
    const button = this.renderButton(isFavorited, favoritesCount)

    if (!isAuthenticated) {
      return (
        <Popup
          trigger={button}
          content={this.renderLoginButton()}
          on='click'
          position='bottom center'
        />
      )
    }

    return button
  }
}

FavoriteButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  screenshotId: PropTypes.string.isRequired,
  isFavorited: PropTypes.bool,
  favoritesCount: PropTypes.number.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default FavoriteButton
