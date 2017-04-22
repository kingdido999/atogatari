import React, { Component, PropTypes } from 'react'
import { Container } from 'semantic-ui-react'
import Zooming from 'zooming'

import ScreenshotCards from '../components/ScreenshotCards'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  uid: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  view: PropTypes.string.isRequired,
  itemsPerRow: PropTypes.number.isRequired,
  users: PropTypes.object.isRequired,
  screenshots: PropTypes.object.isRequired,
  screenshotIds: PropTypes.array.isRequired
}

class ScreenshotsPage extends Component {
  render() {
    const zooming = new Zooming({
      bgColor: '#000'
    })

    return (
      <Container>
        <ScreenshotCards zooming={zooming} {...this.props} />
      </Container>
    )
  }
}

ScreenshotsPage.propTypes = propTypes

export default ScreenshotsPage
