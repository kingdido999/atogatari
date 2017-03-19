import React, { Component, PropTypes } from 'react'
import { Menu } from 'semantic-ui-react'
import { uniq } from 'lodash'

import EpisodeLabels from './EpisodeLabels'

class ScreenshotFilters extends Component {

  render () {
    const { screenshots, bangumiScreenshots } = this.props

    const episodes = uniq(bangumiScreenshots.ids
    .reduce((acc, id) => acc.concat(screenshots[id].episode), []))
    .sort((a, b) => a - b)

    return (
      <Menu secondary>
        <EpisodeLabels
          episodes={episodes}
          selectedEpisode={bangumiScreenshots.episode}
          { ...this.props }
        />
      </Menu>
    )
  }
}

ScreenshotFilters.propTypes = {
  dispatch: PropTypes.func.isRequired,
  bangumiId: PropTypes.string.isRequired,
  screenshots: PropTypes.object.isRequired,
  bangumiScreenshots: PropTypes.object.isRequired
}

export default ScreenshotFilters
