import React, { Component, PropTypes } from 'react'
import { Label } from 'semantic-ui-react'

import { setBangumiEpisode } from '../actions/entities'

class EpisodeLabel extends Component {

  handleClick = (event, data) => {
    const { dispatch, bangumiId, episode, isActive } = this.props
    dispatch(setBangumiEpisode(bangumiId, isActive ? undefined : episode))
  }

  renderActiveLabel = () => {
    const { episode } = this.props

    return (
      <Label
        as='a'
        key={episode}
        color='orange'
        onClick={this.handleClick}>
        {episode}
      </Label>
    )
  }

  renderInactiveLabel = () => {
    const { episode } = this.props

    return (
      <Label
        as='a'
        key={episode}
        onClick={this.handleClick}>
        {episode}
      </Label>
    )
  }

  render () {
    const { isActive } = this.props

    if (isActive) return this.renderActiveLabel()
    return this.renderInactiveLabel()
  }
}

EpisodeLabel.propTypes = {
  dispatch: PropTypes.func.isRequired,
  bangumiId: PropTypes.string.isRequired,
  episode: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default EpisodeLabel
