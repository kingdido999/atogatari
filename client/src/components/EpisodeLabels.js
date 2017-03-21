import React, { Component, PropTypes } from 'react'
import { Label } from 'semantic-ui-react'

import EpisodeLabel from './EpisodeLabel'

class EpisodeLabels extends Component {

  render () {
    const { episodes, selectedEpisode, color } = this.props

    return (
      <Label.Group>
        <Label color={color}>
          Episode
        </Label>
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
  color: PropTypes.string.isRequired,
}

export default EpisodeLabels
