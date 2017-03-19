import React, { Component } from 'react'
import { Label } from 'semantic-ui-react'

import { setBangumiEpisode } from '../actions/entities'

class EpisodeLabel extends Component {

  handleClick = (event, data) => {
    const { dispatch, bangumiId, episode, isActive } = this.props

    dispatch(setBangumiEpisode(bangumiId, isActive ? undefined : episode))
  }

  render () {
    const { episode, isActive } = this.props

    return (
      <Label
        as='a'
        key={episode}
        color={isActive ? 'orange' : 'grey'}
        onClick={this.handleClick}>
        {episode}
      </Label>
    )
  }
}

export default EpisodeLabel
