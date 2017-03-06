import React, { Component, PropTypes } from 'react'
import { Button, Icon } from 'semantic-ui-react'

import { addFavorite, removeFavorite } from '../actions/favorite'

class FavoriteButton extends Component {

  toggleFavorite = () => {
    const { dispatch, screenshotId, favorite } = this.props
    const data = {
      screenshotId: screenshotId,
      token: localStorage.getItem('token')
    }

    if (favorite) {
      dispatch(removeFavorite(data))
    } else {
      dispatch(addFavorite(data))
    }
  }

  renderIcon () {
    const { favorite } = this.props

    return (
      <Icon name="favorite" color={ favorite ? 'yellow' : 'grey' } />
    )
  }

  render () {
    const icon = this.renderIcon()

    return (
      <Button icon={icon} onClick={this.toggleFavorite} />
    )
  }
}

FavoriteButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  screenshotId: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired
}

export default FavoriteButton
