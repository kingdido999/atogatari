import React, { Component, PropTypes } from 'react'
import { Container } from 'semantic-ui-react'
import Zooming from 'zooming'

import FiltersContainer from '../containers/FiltersContainer'
import ScreenshotCards from './ScreenshotCards'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  authedUser: PropTypes.object,
  screenshots: PropTypes.object.isRequired,
  favorites: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired,
  screenshotIds: PropTypes.array.isRequired
}

class UserFavoritesPage extends Component {
  render() {
    const zooming = new Zooming({
      bgColor: '#000'
    })

    return (
      <Container>
        <FiltersContainer />
        <ScreenshotCards {...this.props} zooming={zooming} />
      </Container>
    )
  }
}

UserFavoritesPage.propTypes = propTypes

export default UserFavoritesPage
