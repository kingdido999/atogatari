import React, { Component, PropTypes } from 'react'
import { Item } from 'semantic-ui-react'
import { Link } from 'react-router'

import { pluralize } from '../utils'

class BangumiCard extends Component {

  render () {
    const { _id, title, episodes } = this.props
    const numScreenshots = episodes.reduce((sum, episode) => {
      return sum + episode.screenshots.length
    }, 0)

    return (
      <Item as={Link} to={`/bangumi/${_id}`}>
        <Item.Content>
          <Item.Header>{ title }</Item.Header>
          <Item.Meta>{ numScreenshots } { pluralize('screenshot', numScreenshots) }</Item.Meta>
        </Item.Content>
      </Item>
    )
  }
}

BangumiCard.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  episodes: PropTypes.array.isRequired
}

export default BangumiCard
