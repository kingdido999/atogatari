import React, { Component, PropTypes } from 'react'
import { Card } from 'semantic-ui-react'


class Bangumi extends Component {

  render () {
    const { title, episodes } = this.props
    const numScreenshots = episodes.reduce((sum, episode) => {
      return sum + episode.screenshots.length
    }, 0)

    return (
      <Card>
        <Card.Content>
          <Card.Header>{ title }</Card.Header>
          <Card.Meta>{ numScreenshots } screenshots</Card.Meta>
        </Card.Content>
      </Card>
    )
  }
}

Bangumi.propTypes = {
  title: PropTypes.string.isRequired,
  episodes: PropTypes.array.isRequired
}

export default Bangumi
