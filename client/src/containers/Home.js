import React, { Component, PropTypes } from 'react'
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Zooming from 'zooming'

import ScreenshotCards from '../components/ScreenshotCards'

import { getScreenshots } from '../actions/entities'

class Home extends Component {

  componentWillMount () {
    const { dispatch, nsfw } = this.props
    dispatch(getScreenshots({ nsfw }))
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
  const { isFetching, nsfw } = screenshots

  return {
    isAuthenticated,
    isFetching,
    nsfw,
    screenshots: entities.screenshots,
    screenshotIds: screenshots.ids,
    screenshotFavorites,
    userFavorites: userFavorites[uid]
  }
}

export default connect(mapStateToProps)(Home)
