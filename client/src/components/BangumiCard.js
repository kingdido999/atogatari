import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { Card, Image } from 'semantic-ui-react'

import { getImageUrl, pluralize } from '../utils'

class BangumiCard extends Component {

  handleOnClick = () => {
    const { id } = this.props
    browserHistory.push(`/bangumi/${id}`)
  }

  render () {
    const { title, episodes } = this.props
    const numScreenshots = episodes.reduce((sum, episode) => {
      return sum + episode.screenshots.length
    }, 0)

    const thumbnailFilename = episodes[0].screenshots[0].thumbnail_filename
    const screenshotUrl = getImageUrl(thumbnailFilename)

    return (
      <Card onClick={this.handleOnClick}>
        <Image src={screenshotUrl} />
        <Card.Content>
          <Card.Header>{ title }</Card.Header>
          <Card.Meta>{ numScreenshots } { pluralize('screenshot', numScreenshots) }</Card.Meta>
        </Card.Content>
      </Card>
    )
  }
}

BangumiCard.propTypes = {
  title: PropTypes.string.isRequired,
  episodes: PropTypes.array.isRequired
}

export default BangumiCard
