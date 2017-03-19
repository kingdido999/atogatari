import React, { Component, PropTypes } from 'react'
import { Label } from 'semantic-ui-react'

import EpisodeLabel from './EpisodeLabel'

class EpisodeLabels extends Component {

  render () {

    const { episodes, selectedEpisode } = this.props

    return (
      <Label.Group>
        {episodes.map(episode =>
          <EpisodeLabel
            key={episode}
            episode={episode}
            isActive={selectedEpisode === episode}
            { ...this.props }
          />
        )}
      </Label.Group>
    )
  }
}

Component.propTypes = {
  dispatch: PropTypes.func.isRequired,
  bangumiId: PropTypes.string.isRequired,
  episodes: PropTypes.array.isRequired,
  selectedEpisode: PropTypes.number,
}

export default EpisodeLabels
