import React, { Component, PropTypes } from 'react'
import { Card } from 'semantic-ui-react'

import ScreenshotCard from './ScreenshotCard'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  uid: PropTypes.string,
  zooming: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
  itemsPerRow: PropTypes.number.isRequired,
  users: PropTypes.object.isRequired,
  screenshots: PropTypes.object.isRequired,
  screenshotIds: PropTypes.array.isRequired,
  userFavorites: PropTypes.object,
  screenshotFavorites: PropTypes.object.isRequired
}

class ScreenshotCards extends Component {
  render() {
    const {
      itemsPerRow,
      view,
      users,
      uid,
      screenshots,
      screenshotIds,
      screenshotFavorites
    } = this.props

    const cards = []

    screenshotIds.forEach((id, index) => {
      const authedUser = users[uid]
      const screenshot = screenshots[id]
      const isOwner = screenshot !== undefined && uid === screenshot.user
      const isAdmin =
        authedUser !== undefined &&
        authedUser.roles &&
        authedUser.roles.includes('admin')
      cards.push(
        <ScreenshotCard
          {...this.props}
          key={index}
          screenshot={screenshot}
          screenshotFavorites={screenshotFavorites[id]}
          isOwner={isOwner}
          isAdmin={isAdmin}
        />
      )
    })

    return (
      <Card.Group itemsPerRow={view === 'grid' ? itemsPerRow : null} stackable>
        {cards}
      </Card.Group>
    )
  }
}

ScreenshotCards.propTypes = propTypes

export default ScreenshotCards
