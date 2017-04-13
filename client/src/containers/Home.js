import React, { Component, PropTypes } from 'react'
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Zooming from 'zooming'

import ScreenshotCards from '../components/ScreenshotCards'

import { getScreenshots } from '../actions/entities'

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
  const { isFetching, sortBy, nsfw, view } = screenshots

  let screenshotIds = screenshots.ids

  screenshotIds = screenshotIds.filter(id => {
    if (nsfw) return true
    return entities.screenshots[id].nsfw === false
  })

  screenshotIds = screenshotIds.sort((i, j) => {
    if (sortBy === 'date') {
      const dateI = new Date(entities.screenshots[i].createdAt)
      const dateJ = new Date(entities.screenshots[j].createdAt) 

      if (dateI > dateJ) return -1
      if (dateI < dateJ) return 1
      return 0
    }

    if (sortBy === 'popularity') {
      const scoreI = entities.screenshots[i].favorites.length
      const scoreJ = entities.screenshots[j].favorites.length
      return scoreJ - scoreI
    }

    return 0
  })

  return {
    isAuthenticated,
    isFetching,
    nsfw,
    view,
    screenshots: entities.screenshots,
    screenshotIds,
    screenshotFavorites,
    userFavorites: userFavorites[uid]
  }
}

export default connect(mapStateToProps)(Home)
