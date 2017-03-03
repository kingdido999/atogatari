import React, { Component, PropTypes } from 'react'
import { Item, Image } from 'semantic-ui-react'

import ScreenshotItem from './ScreenshotItem'

class EpisodeItem extends Component {

  render () {
    const { index, screenshots, dispatch } = this.props

    return (
      <Item>
        <Item.Content>
          <Item.Header>Episode {index}</Item.Header>
          <Image.Group>
            {screenshots.map(screenshot =>
              <ScreenshotItem
                dispatch={dispatch}
                key={screenshot._id}
                thumbnail_filename={screenshot.thumbnail_filename}
                original_filename={screenshot.original_filename}
              />
            )}
          </Image.Group>
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
