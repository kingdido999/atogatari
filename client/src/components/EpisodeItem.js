import React, { Component, PropTypes } from 'react'
import { Item, Card } from 'semantic-ui-react'

import ScreenshotCard from './ScreenshotCard'

class EpisodeItem extends Component {

  render () {
    const { index, screenshots, dispatch, zooming, favorites, isAuthenticated } = this.props

    return (
      <Item>
        <Item.Content>
          <Item.Header>Episode {index}</Item.Header>
          <Card.Group>
            {screenshots.map(screenshot =>
              <ScreenshotCard
                dispatch={dispatch}
                key={screenshot._id}
                screenshot={screenshot}
                zooming={zooming}
                favorites={favorites}
                isAuthenticated={isAuthenticated}
              />
            )}
          </Card.Group>
        </Item.Content>
      </Item>
    )
  }
}

EpisodeItem.propTypes = {
  index: PropTypes.number.isRequired,
  screenshots: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default EpisodeItem
