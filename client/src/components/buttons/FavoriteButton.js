import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Icon, Popup } from 'semantic-ui-react'
import { Link } from 'react-router'

import { toggleFavorite } from '../../actions/authed'

class FavoriteButton extends Component {

  toggleFavorite = () => {
    const { dispatch, isAuthenticated, screenshotId } = this.props

    if (!isAuthenticated) return

    dispatch(toggleFavorite({ screenshotId: screenshotId }))
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
    const { isAuthenticated, screenshotId, favorites, screenshots } = this.props
    const screenshot = screenshots[screenshotId]
    let isFavorited = false

    for (let favorite in favorites) {
      if (favorite.screenshot === screenshotId) {
        isFavorited = true
        break
      }
    }

    const favoritesCount = screenshot.favorites.length

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
  favorites: PropTypes.object,
  screenshots: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { entities, authed } = state
  const { screenshots } = entities
  const { favorites } = authed

  return {
    favorites,
    screenshots
  }
}

export default connect(mapStateToProps)(FavoriteButton)
