import React, { Component, PropTypes } from 'react'
import { Button, Icon, Popup } from 'semantic-ui-react'
import { Link } from 'react-router'

import { toggleFavorite } from '../actions/authed'
import { getScreenshots } from '../actions/entities'

class FavoriteButton extends Component {

  toggleFavorite = () => {
    const { dispatch, screenshotId, bangumiId } = this.props

    dispatch(toggleFavorite({
      screenshotId: screenshotId,
      token: localStorage.getItem('token')
    }))
    .then(res => {
      dispatch(getScreenshots({ bangumiId: bangumiId }))
    })
  }

  renderIcon () {
    const { isFavorited } = this.props

    return (
      <Icon name="favorite" color={ isFavorited ? 'yellow' : 'grey' } />
    )
  }

  render () {
    const icon = this.renderIcon()
    const { isAuthenticated, favoritesCount } = this.props

    if (isAuthenticated) {
      return (
        <Button
          icon={icon}
          onClick={this.toggleFavorite}
          label={{ as: 'a', basic: true, content: favoritesCount }}
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
        label={{ as: 'a', basic: true, content: favoritesCount }}
        labelPosition='right'
      />
    )
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
