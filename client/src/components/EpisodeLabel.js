import React, { Component } from 'react'
import { Label } from 'semantic-ui-react'

import { setBangumiEpisode } from '../actions/entities'

class EpisodeLabel extends Component {

  handleClick = (event, data) => {
    const { dispatch, bangumiId, episode, active } = this.props

    dispatch(setBangumiEpisode(bangumiId, active ? undefined : episode))
  }

  render () {
    const { episode, active } = this.props

    return (
      <Label
        as='a'
        key={episode}
        color={active ? 'orange' : 'grey'}
        onClick={this.handleClick}>
        {episode}
      </Label>
    )
  }
}

export default EpisodeLabel
