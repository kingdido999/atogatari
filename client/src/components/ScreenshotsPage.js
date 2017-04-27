import React, { Component, PropTypes } from 'react'
import { Container } from 'semantic-ui-react'

import ScreenshotCards from '../components/ScreenshotCards'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  itemsPerRow: PropTypes.number.isRequired,
  authedUser: PropTypes.object,
  tags: PropTypes.object.isRequired,
  screenshots: PropTypes.object.isRequired,
  screenshotIds: PropTypes.array.isRequired
}

class ScreenshotsPage extends Component {
  render() {
    return (
      <Container>
        <ScreenshotCards {...this.props} />
      </Container>
    )
  }
}

ScreenshotsPage.propTypes = propTypes

export default ScreenshotsPage
