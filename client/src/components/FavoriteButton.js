import React, { Component, PropTypes } from 'react'
import { Button, Icon, Popup } from 'semantic-ui-react'
import { Link } from 'react-router'

import { toggleFavorite } from '../actions/user'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFavorited: PropTypes.bool.isRequired,
  screenshotId: PropTypes.string.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

class FavoriteButton extends Component {
  toggleFavorite = () => {
    const { dispatch, isAuthenticated, screenshotId } = this.props
    if (!isAuthenticated) return
    dispatch(toggleFavorite({ screenshotId: screenshotId }))
  }

  renderIcon(isFavorited) {
    if (isFavorited) {
      return <Icon name="favorite" color="yellow" />
    } else {
      return <Icon name="favorite" />
    }
  }

  renderButton(isFavorited, favoritesCount) {
    const icon = this.renderIcon(isFavorited)
    const content = isFavorited
      ? favoritesCount > 1 ? favoritesCount : ''
      : favoritesCount > 0 ? favoritesCount : ''

    return (
      <Button
        basic
        icon={icon}
        onClick={this.toggleFavorite}
        content={content}
      />
    )
  }

  renderLoginButton() {
    return <Button primary content="Login" as={Link} to="/login" />
  }

  render() {
    const { isAuthenticated, isFavorited, favoritesCount } = this.props
    const button = this.renderButton(isFavorited, favoritesCount)

    if (!isAuthenticated) {
      return (
        <Popup
          trigger={button}
          content={this.renderLoginButton()}
          on="click"
          position="bottom center"
        />
      )
    }

    return button
  }
}

FavoriteButton.propTypes = propTypes

export default FavoriteButton
