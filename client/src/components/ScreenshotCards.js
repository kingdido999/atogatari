import React, { Component, PropTypes } from 'react'
import { Card } from 'semantic-ui-react'

import ScreenshotCard from './ScreenshotCard'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  zooming: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
  itemsPerRow: PropTypes.number.isRequired,
  authedUser: PropTypes.object,
  users: PropTypes.object.isRequired,
  screenshots: PropTypes.object.isRequired,
  screenshotIds: PropTypes.array.isRequired
}

class ScreenshotCards extends Component {
  render() {
    const {
      itemsPerRow,
      view,
      authedUser,
      users,
      screenshots,
      screenshotIds
    } = this.props

    const isAdmin =
      authedUser && authedUser.roles && authedUser.roles.includes('admin')

    let cards = []

    screenshotIds.forEach((id, index) => {
      const screenshot = screenshots[id]
      if (!screenshot) return
      const { favorites, user } = screenshot
      const owner = users[user]
      if (!owner) return
      const isOwner = authedUser && authedUser._id === screenshot.user
      const isFavorited = authedUser
        ? authedUser.favorites.find(id => favorites.includes(id)) !== undefined
        : false

      cards.push(
        <ScreenshotCard
          {...this.props}
          key={index}
          screenshot={screenshot}
          authedUser={authedUser}
          owner={owner}
          isOwner={isOwner}
          isAdmin={isAdmin}
          isFavorited={isFavorited}
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
