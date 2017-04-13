import React, { Component, PropTypes } from 'react'
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Zooming from 'zooming'

import ScreenshotCards from '../components/ScreenshotCards'

import { getScreenshots } from '../actions/entities'
import { getFilteredScreenshotIds } from '../selectors'

class Home extends Component {

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(getScreenshots())
  }

  render() {
    const { screenshotIds } = this.props

    return (
      <Container>
        <ScreenshotCards
          screenshotIds={screenshotIds}
          zooming={new Zooming()}
          { ...this.props }
        />
      </Container>
    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  screenshots: PropTypes.object.isRequired,
  screenshotIds: PropTypes.array.isRequired,
  screenshotFavorites: PropTypes.object.isRequired,
  userFavorites: PropTypes.object,
}

function mapStateToProps(state) {
  const { user, entities, screenshots, screenshotFavorites, userFavorites } = state
  const { isAuthenticated, uid } = user
  const { isFetching, view } = screenshots
  
  return {
    isAuthenticated,
    isFetching,
    view,
    screenshots: entities.screenshots,
    screenshotIds: getFilteredScreenshotIds(state),
    screenshotFavorites,
    userFavorites: userFavorites[uid]
  }
}

export default connect(mapStateToProps)(Home)
