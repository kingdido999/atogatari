import React, { Component, PropTypes } from 'react'
import { Container, Segment } from 'semantic-ui-react'
import Zooming from 'zooming'

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

        <Segment vertical basic>
          <ScreenshotCards {...this.props} zooming={zooming} />
        </Segment>
      </Container>
    )
  }
}

UserFavoritesPage.propTypes = propTypes

export default UserFavoritesPage
