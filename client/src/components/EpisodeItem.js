import React, { Component, PropTypes } from 'react'
import { Item, Card } from 'semantic-ui-react'

import ScreenshotCard from './ScreenshotCard'

class EpisodeItem extends Component {

  render () {
    const { index, screenshots, dispatch, zooming } = this.props

    return (
      <Item>
        <Item.Content>
          <Item.Header>Episode {index}</Item.Header>
          <Card.Group>
            {screenshots.map(screenshot =>
              <ScreenshotCard
                dispatch={dispatch}
                key={screenshot._id}
                id={screenshot._id}
                thumbnail_filename={screenshot.thumbnail_filename}
                original_filename={screenshot.original_filename}
                zooming={zooming}
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
  dispatch: PropTypes.func.isRequired
}

export default EpisodeItem
