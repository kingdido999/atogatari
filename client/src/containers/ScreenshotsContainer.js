import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import Zooming from 'zooming'

import ScreenshotCards from '../components/ScreenshotCards'
import { getScreenshots } from '../actions/entities'
import { getFilteredScreenshotIds } from '../selectors'

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

class ScreenshotsContainer extends Component {

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(getScreenshots())
  }

  render() {
    return (
      <Container>
        <ScreenshotCards
          zooming={new Zooming()}
          { ...this.props }
        />
      </Container>
    )
  }
}

function mapStateToProps(state) {
  const { user, entities, screenshots, screenshotFavorites, userFavorites } = state
  const { isAuthenticated, uid } = user
  const { view, itemsPerRow } = screenshots
  
  return {
    isAuthenticated,
    view,
    itemsPerRow,
    screenshots: entities.screenshots,
    screenshotIds: getFilteredScreenshotIds(state),
    screenshotFavorites,
    userFavorites: userFavorites[uid]
  }
}

ScreenshotsContainer.propTypes = propTypes

export default connect(mapStateToProps)(ScreenshotsContainer)
