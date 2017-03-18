import React, { Component } from 'react'
import { Menu, Label } from 'semantic-ui-react'

import EpisodeLabel from './EpisodeLabel'

class ScreenshotFilters extends Component {

  render () {
    const { dispatch, bangumiId, episodes, bangumiScreenshots } = this.props

    return (
      <Menu secondary>
        <Label.Group circular>
          {episodes.map(episode =>
            <EpisodeLabel
              key={episode}
              dispatch={dispatch}
              bangumiId={bangumiId}
              episode={episode}
              active={bangumiScreenshots.episode === episode}
            />
          )}
        </Label.Group>
      </Menu>
    )
  }
}

export default ScreenshotFilters
