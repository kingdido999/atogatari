import React, { Component, PropTypes } from 'react'
import { Button, Icon, Popup } from 'semantic-ui-react'
import { Link } from 'react-router'

import { toggleFavorite } from '../actions/authed'

class FavoriteButton extends Component {

  toggleFavorite = () => {
    const { dispatch, screenshotId } = this.props

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

  render () {
    const { isAuthenticated, isFavorited, favoritesCount } = this.props
    const icon = this.renderIcon(isFavorited)

    if (isAuthenticated) {
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
            label={{ as: 'a', content: favoritesCount }}
            labelPosition='right'
            onClick={this.toggleFavorite}
          />
        )
      }
    } else {
      return (
        <Popup
          trigger={<Button icon={icon} />}
          content={<Button color='green' content='Login' as={Link} to="/login" />}
          on='click'
          position='bottom center'
          label={{ as: 'a', content: favoritesCount }}
          labelPosition='right'
        />
      )
    }
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
