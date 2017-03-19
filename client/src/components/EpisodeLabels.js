import React, { Component } from 'react'
import { Label } from 'semantic-ui-react'

import EpisodeLabel from './EpisodeLabel'

class EpisodeLabels extends Component {

  render () {

    const { episodes, selectedEpisode } = this.props

    return (
      <Label.Group circular>
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

export default EpisodeLabels
