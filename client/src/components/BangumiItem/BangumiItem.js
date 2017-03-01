import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { Card } from 'semantic-ui-react'


class BangumiItem extends Component {

  handleOnClick = () => {
    const { id } = this.props
    browserHistory.push(`/bangumi/${id}`)
  }

  render () {
    const { title, episodes } = this.props
    const numScreenshots = episodes.reduce((sum, episode) => {
      return sum + episode.screenshots.length
    }, 0)

    return (
      <Card onClick={this.handleOnClick}>
        <Card.Content>
          <Card.Header>{ title }</Card.Header>
          <Card.Meta>{ numScreenshots } screenshots</Card.Meta>
        </Card.Content>
      </Card>
    )
  }
}

BangumiItem.propTypes = {
  title: PropTypes.string.isRequired,
  episodes: PropTypes.array.isRequired
}

export default BangumiItem
