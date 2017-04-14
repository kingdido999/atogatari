import React, { Component, PropTypes } from 'react'
import { Container } from 'semantic-ui-react'
import Zooming from 'zooming'

import ScreenshotCards from '../components/ScreenshotCards'
import { getScreenshots } from '../actions/entities'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  view: PropTypes.string.isRequired,
  itemsPerRow: PropTypes.number.isRequired,
  screenshots: PropTypes.object.isRequired,
  screenshotIds: PropTypes.array.isRequired,
  screenshotFavorites: PropTypes.object.isRequired,
  userFavorites: PropTypes.object,
}

class ScreenshotsPage extends Component {

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(getScreenshots())
  }

  render() {
    const zooming = new Zooming({
      bgColor: '#000'
    })

    return (
      <Container>
        <ScreenshotCards
          zooming={zooming}
          { ...this.props }
        />
      </Container>
    )
  }
}

ScreenshotsPage.propTypes = propTypes

export default ScreenshotsPage
