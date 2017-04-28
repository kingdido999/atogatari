import React, { Component, PropTypes } from 'react'
import { Container, Segment } from 'semantic-ui-react'
import Zooming from 'zooming'

import FiltersContainer from '../containers/FiltersContainer'
import ScreenshotCards from '../components/ScreenshotCards'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  authedUser: PropTypes.object,
  tags: PropTypes.object.isRequired,
  screenshots: PropTypes.object.isRequired,
  favorites: PropTypes.object.isRequired,
  screenshotIds: PropTypes.array.isRequired
}

class UserUploadsPage extends Component {
  render() {
    const zooming = new Zooming({
      bgColor: '#000'
    })

    return (
      <Container>
        <FiltersContainer />
        <Segment vertical basic>
          <ScreenshotCards {...this.props} zooming={zooming} />
        </Segment>
      </Container>
    )
  }
}

UserUploadsPage.propTypes = propTypes

export default UserUploadsPage
